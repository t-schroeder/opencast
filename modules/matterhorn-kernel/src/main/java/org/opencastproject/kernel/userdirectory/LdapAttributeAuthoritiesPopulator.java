/**
 * Licensed to The Apereo Foundation under one or more contributor license
 * agreements. See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 *
 * The Apereo Foundation licenses this file to you under the Educational
 * Community License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License
 * at:
 *
 *   http://opensource.org/licenses/ecl2.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 */
package org.opencastproject.kernel.userdirectory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class LdapAttributeAuthoritiesPopulator implements LdapAuthoritiesPopulator {

  private String[] attributeNames;
  private static final Logger logger = LoggerFactory.getLogger(LdapAttributeAuthoritiesPopulator.class);

  /**
   * Build a new authorities populator
   *
   * This assumes that the authenticated users contain an attribute consisting of a space- or comma-separated list of
   * authorities
   *
   * @param attributeNames
   *          The LDAP user attribute containing the roles
   */
  public LdapAttributeAuthoritiesPopulator(String... attributeNames) {
    this.attributeNames = attributeNames;
  }

  @Override
  public Collection<? extends GrantedAuthority> getGrantedAuthorities(DirContextOperations userData, String username) {
    Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
    for (String attributeName : attributeNames) {
      try {
        String[] attributeValues = userData.getStringAttributes(attributeName);
        // Should the attribute not be defined, the returned array is null
        if (attributeValues != null) {
          for (String attributeValue : attributeValues) {
            // The attribute value may be a single authority (a single role) or a list of roles
            for (String authority : attributeValue.split("[\\s,]")) {
              // Since we split on whitespaces also, there's no need to "trim" the resulting parts
              // We only need to ignore the empty parts
              if (!authority.isEmpty()) {
                authorities.add(new SimpleGrantedAuthority(authority));
              }
            }
          }
        } else {
          logger.debug("Could not find any attribute named '{}' in user '{}'", attributeName, userData.getDn());
        }
      } catch (ClassCastException e) {
        logger.error("Specified attribute containing user roles ('{}') was not of expected type String: {}",
                attributeName, e);
      }
    }
    // TODO For some reason, Matterhorn requires the role anonymous...
    // TODO Should we include it always, or only if no other roles are present?
    authorities.add(new SimpleGrantedAuthority("ROLE_ANONYMOUS"));

    return authorities;
  }

}
