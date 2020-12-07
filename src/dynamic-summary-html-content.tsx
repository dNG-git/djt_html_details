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

import {
    ComponentContext,
    DynamicHtmlContent,
    DynamicHtmlContentProps,
    DynamicHtmlContentState
} from '@dng-git/djt-html-component';

/**
 * Dynamic HTML content implementation for an "HTMLSummaryElement" node.
 *
 * @author    direct Netware Group
 * @copyright (C) direct Netware Group - All rights reserved
 * @package   djt-html-details
 * @since     v1.0.0
 * @license   https://www.direct-netware.de/redirect?licenses;mpl2
 *            Mozilla Public License, v. 2.0
 */
export class DynamicSummaryHtmlContent<
    P extends DynamicHtmlContentProps = DynamicHtmlContentProps,
    S extends DynamicHtmlContentState = DynamicHtmlContentState,
    C = ComponentContext
> extends DynamicHtmlContent<P, S, C> {
    /**
     * Returns the tag name used when "attachAndMount()" is used.
     *
     * @return Tag name to attach to DOM
     * @since  v1.0.0
     */
    protected static get attachingTagName() {
        return 'summary';
    }

    /**
     * Returns the static component name.
     *
     * @return Static component name
     * @since  v1.0.0
     */
    public static get componentName() {
        return 'djt-dynamic-summary-html-content';
    }
}
