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
    Component,
    ComponentContext,
    createElement,
    createRef,
    DomUtilities,
    DynamicHtmlContent,
    Fragment,
    OriginalElementData
} from '@dng-git/djt-html-component';

import { DetailsProps, DetailsState } from './details-interfaces';

import { DynamicSummaryHtmlContent } from './dynamic-summary-html-content';

/**
 * "Details" provides a backward-compatible variant of the (X)HTML5 "details"
 * element.
 *
 * @author    direct Netware Group
 * @copyright (C) direct Netware Group - All rights reserved
 * @package   djt-html-details
 * @since     v1.0.0
 * @license   https://www.direct-netware.de/redirect?licenses;mpl2
 *            Mozilla Public License, v. 2.0
 */
export default class Details<
    P extends DetailsProps = DetailsProps,
    S extends DetailsState = DetailsState,
    C = ComponentContext
> extends Component<P, S, C> {
    /**
     * Flag indicating that "details" is supported natively.
     */
    protected static nativeDetailsSupported: boolean | void = undefined;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    /**
     * React reference to the native details content DOM node
     */
    protected contentNode = createRef<any>();
    /**
     * React reference to the native details DOM node
     */
    protected detailsNode = createRef<any>();
    /**
     * React reference to the native summary DOM node
     */
    protected summaryNode = createRef<any>();
    /* eslint-enable @typescript-eslint/no-explicit-any */

    /**
     * Constructor (Details)
     *
     * @param props Details props
     * @param args Additional arguments given
     *
     * @since v1.0.0
     */
    constructor(props?: P, ...args: unknown[]) {
        super(props, ...args);

        this.onTapToggleDetails = this.onTapToggleDetails.bind(this);
    }

    /**
     * Returns true if the original element DOM node is of type "HTMLDetailsElement".
     *
     * @return Native details DOM node
     * @since  v1.0.0
     */
    public get isOriginalDetailsElement() {
        return (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            this.instanceClass.nativeDialogSupported
            && this.originalElement
            && this.originalElement.nodeName.toLowerCase() === 'details'
        );
    }

    /**
     * Returns the native details DOM node.
     *
     * @return Native details DOM node
     * @since  v1.0.0
     */
    protected get nativeDetailsNode() {
        let _return;

        if (this.state.isNativeImplementation) {
            _return = (
                this.isOriginalDetailsElement
                ? this.originalElement
                : Details.getDomElement(this.detailsNode.current)
            ) as HTMLDetailsElement;
        }

        return _return;
    }

    /**
     * reactjs.org: It is invoked immediately after a component is mounted
     * (inserted into the tree).
     *
     * @since v1.0.0
     */
    public componentDidMount() {
        super.componentDidMount();

        if (this.isOriginalDetailsElement) {
            this.originalElement.setAttribute('id', this.state.id);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const instanceClass = this.instanceClass;
        const nativeDetailsNode = this.nativeDetailsNode;

        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        if (instanceClass.nativeDetailsSupported === undefined && nativeDetailsNode) {
            instanceClass.nativeDetailsSupported = (typeof nativeDetailsNode.open == 'boolean');

            if (!instanceClass.nativeDetailsSupported) {
                this.setState({ isNativeImplementation: false });
            }
        }

        if (instanceClass.nativeDetailsSupported && this.state.isVisible) {
            nativeDetailsNode.open = true;
        }
        /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    }

    /**
     * reactjs.org: It is invoked immediately after updating occurs.

     * @param oldProps Old props
     * @param oldState Old state
     * @param snapshot Snapshot data defined in "getSnapshotBeforeUpdate()"
     *
     * @since v1.0.0
     */
    public componentDidUpdate(oldProps: P, oldState: S, snapshot?: unknown) {
        super.componentDidUpdate(oldProps, oldState, snapshot);

        const content = (
            typeof this.state.content == 'string'
            ? this.state.content : String(this.state.content)
        );

        const summary = (
            typeof this.state.summary == 'string'
            ? this.state.summary : String(this.state.summary)
        );

        const isHtmlChanged = (oldState.content !== content || oldState.summary !== summary);

        if (isHtmlChanged) {
            if (oldState.content !== content) {
                (this.contentNode.current as DynamicHtmlContent).setState({ content });
            }

            if (oldState.summary !== summary) {
                (this.summaryNode.current as DynamicSummaryHtmlContent).setState({ content: summary });
            }
        }
    }

    /**
     * Called for tapping on the summary node to hide or show details.
     *
     * @param _ Event object
     *
     * @since v1.0.0
     */
    public onTapToggleDetails(_: Event) {
        this.setState({ isVisible: (!this.state.isVisible) });
    }

    /**
     * Returns the React component content to be rendered.

     * @return React component content to be rendered
     * @since  v1.0.0
     */
    public render() {
        let _return;

        if (this.state.isNativeImplementation) {
            _return = (
                <>
                    <DynamicSummaryHtmlContent
                        ref={ this.summaryNode }
                        attributes={{ onpointerdown: this.onTapToggleDetails }}
                        content={ this.state.summary }
                    />
                    <DynamicHtmlContent ref={ this.contentNode } content={ this.state.content } />
                </>
            );

            if (this.isOriginalDetailsElement) {
                this.nativeDetailsNode.className = DomUtilities.getFilteredAndPrependedString(
                    this.nativeDetailsNode.className,
                    [ this.state.cssOpenedClass, this.state.cssClosedClass ],
                    (this.state.isVisible ? this.state.cssOpenedClass : this.state.cssClosedClass)
                );
            } else {
                _return = (
                    <details
                        ref={ this.detailsNode }
                        id={ this.state.id }
                        className={ this.state.isVisible ? this.state.cssOpenedClass : this.state.cssClosedClass }
                    >{ _return }</details>
                );
            }
        } else {
            _return = (
<div
    ref={ this.detailsNode }
    id={ this.state.id }
    className={ this.state.cssNonNativeContainerClass + ' ' + (this.state.isVisible ? this.state.cssOpenedClass : this.state.cssClosedClass) }
>
<DynamicHtmlContent
    ref={ this.summaryNode }
    attributes={{ onpointerdown: this.onTapToggleDetails }}
    className={ this.state.cssNonNativeSummaryClass }
    content={ this.state.summary }
/>
<DynamicHtmlContent ref={ this.contentNode } content={ this.state.content } style={ (this.state.isVisible ? '' : { display: 'none' }) } />
</div>
            );
        }

        return _return;
    }

    /**
     * Returns the static component name.
     *
     * @return Static component name
     * @since  v1.0.0
     */
    public static get componentName() {
        return 'djt-details';
    }

    /**
     * Returns a list of node names "originalElementData" should provide the
     * inner HTML content instead of being parsed.
     *
     * @return List of node names
     * @since  v1.0.0
     */
    protected static get originalElementNodeNamesWithHtml() {
        const _return = Component.originalElementNodeNamesWithHtml;
        _return.push('div');
        _return.push('summary');

        return _return;
    }

    /**
     * reactjs.org: It is invoked right before calling the render method, both on
     * the initial mount and on subsequent updates.
     *
     * @param props Current props
     * @param state Current state
     *
     * @return Updated state values object; null otherwise
     * @since  v1.0.0
     */
    public static getDerivedStateFromProps(props: DetailsProps, state: DetailsState) {
        let _return = super.getDerivedStateFromProps(props, state) as DetailsState;

        if (state === null) {
            if (!_return) {
                _return = { } as DetailsState;
            }

            _return['content'] = (props.content ? props.content : '');
            _return['cssClosedClass'] = (props.closedClass ? props.closedClass : 'djt-details-closed');

            _return['cssNonNativeContainerClass'] = (
                props.nonNativeContainerClass
                ? props.nonNativeContainerClass : 'djt-details-non-native-container'
            );

            _return['cssNonNativeSummaryClass'] = (
                props.nonNativeSummaryClass
                ? props.nonNativeSummaryClass : 'djt-details-non-native-summary'
            );

            _return['cssOpenedClass'] = (props.openedClass ? props.openedClass : 'djt-details-opened');

            if (_return.summary === undefined) {
                _return['summary'] = (props.summary ? props.summary : '');
            }

            _return['isVisible'] = !([ '0', false, undefined ].includes(props.isVisible));

            _return['isNativeImplementation'] = (
                this.nativeDetailsSupported !== false
                && (!([ '0', false ].includes(props.nativeImplementation)))
            );

            if (props.originalElementData) {
                const result = this.parseOriginalElementData(props.originalElementData);

                if (result) {
                    _return = Object.assign(_return, result);
                }
            }
        }

        return _return;
    }

    /**
     * Parses the original element data structure for summary and content nodes.
     *
     * @param data Original element data structure to be parsed
     *
     * @return Relevant content node properties
     * @since  v1.0.0
     */
    public static parseOriginalElementData(data: OriginalElementData) {
        let _return;

        if (data.name === 'details') {
            _return = this.parseOriginalElementDetailsRootItems(data.children);
        } else if (data.name === 'djt-details') {
            _return = this.parseOriginalElementDjtDetailsRootItems(data.children);
        }

        return _return;
    }

    /**
     * Parses the given item list for relevant content nodes.
     *
     * @return Relevant content node properties
     * @since  v1.0.0
     */
    protected static parseOriginalElementDetailsRootItems(itemList: OriginalElementData[]) {
        let _return: { [key:string]: string };

        for (const item of itemList) {
            switch (item.name) {
                case 'summary':
                    if (_return) {
                        _return['summary'] = item.html;
                    } else {
                        _return = { summary: item.html };
                    }

                    break;
                default:
                    if (item.html) {
                        if (!_return) {
                            _return = { content: item.html };
                        } else if (_return.content) {
                            _return.content += item.html;
                        } else {
                            _return['content'] = item.html;
                        }
                    }
            }
        }

        return _return;
    }

    /**
     * Parses the given item list for the details or relevant content nodes.
     *
     * @return Relevant content node properties
     * @since  v1.0.0
     */
    protected static parseOriginalElementDjtDetailsRootItems(itemList: OriginalElementData[]) {
        let detailsNode;

        for (const item of itemList) {
            if (item.name === 'details') {
                detailsNode = item.children;
                break;
            }
        }

        return this.parseOriginalElementDetailsRootItems(detailsNode ? detailsNode : itemList);
    }
}
