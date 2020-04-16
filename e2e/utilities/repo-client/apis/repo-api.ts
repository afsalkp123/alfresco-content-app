/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { browser } from 'protractor';
import { AlfrescoApi } from '@alfresco/js-api';
import { Logger } from '@alfresco/adf-testing';

export abstract class RepoApi {
    alfrescoJsApi = new AlfrescoApi();

    constructor(
        private username: string = browser.params.ADMIN_USERNAME,
        private password: string = browser.params.ADMIN_PASSWORD
    ) {
        this.alfrescoJsApi.setConfig(browser.params.config);
    }

    apiAuth() {
        return this.alfrescoJsApi.login(this.username, this.password);
    }

    getUsername() {
        return this.username;
    }

    protected handleError(message: string, response: any) {
        Logger.info(`\n--- ${message} error :`);
        if (response.status && response.response) {
            try {
                Logger.info('\t>>> Status: ', response.status);
                Logger.info('\t>>> Text: ', response.response.text);
                Logger.info('\t>>> Method: ', response.response.error.method);
                Logger.info('\t>>> Path: ', response.response.error.path);
            } catch {
                Logger.info('\t>>> ', response);
            }
        } else {
            Logger.info('\t>>> ', response);
        }
    }
}
