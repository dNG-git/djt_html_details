/**
 * direct JavaScript Toolbox
 * All-in-one toolbox to provide more reusable JavaScript features
 *
 * (C) direct Netware Group - All rights reserved
 * https://www.direct-netware.de/redirect?djt;html;details
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 *
 * https://www.direct-netware.de/redirect?licenses;mpl2
 *
 * @license Mozilla Public License, v. 2.0
 */


import { ComponentProps, ComponentState } from '@dng-git/djt-html-component';

/**
 * "Details" properties interface
 *
 * @since v1.0.0
 */
export interface DetailsProps extends ComponentProps {
    closedClass?: string,
    content?: string,
    isVisible?: string | boolean,
    nativeImplementation?: string | boolean,
    nonNativeContainerClass?: string,
    nonNativeSummaryClass?: string,
    openedClass?: string,
    summary?: string
}

/**
 * "Details" state interface
 *
 * @since v1.0.0
 */
export interface DetailsState extends ComponentState {
    content: string,
    cssClosedClass: string,
    cssNonNativeContainerClass: string,
    cssNonNativeSummaryClass: string,
    cssOpenedClass: string,
    isNativeImplementation: boolean,
    isVisible: boolean,
    summary: string
}
