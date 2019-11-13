export as namespace PFElement;

export = PFElement;

interface IPFElement {
    readonly tag: string;
    schemaUrl?: string;
    styleUrl?: string;
    templateUrl?: string;
    properties?: object;
    cascadingAttributes?: object;
    html?: string;
    slots?: object;
}
interface IPFElementOptions {
    type?: string;
    delayRender?: boolean;
}
interface IPFElementDependencyOpts {
    dependencies?: Array<IPFElementDependency>;
}
interface IPFElementDependency {
    type?: string;
    id?: string;
}
declare class PFElement extends HTMLElement {
    connected: boolean;
    _pfeClass: IPFElement;
    tag: string;
    html?: string;
    schemaUrl?: string;
    templateUrl?: string;
    styleUrl?: string;
    properties?: any;
    static _debugLog: boolean;
    props?: object;
    slots?: object;
    _queue: any[];
    template: HTMLTemplateElement;
    static create(pfe: any): void;
    static debugLog(preference?: any): boolean;
    static log(...msgs: any[]): void;
    static readonly PfeTypes: {
        Container: string;
        Content: string;
        Combo: string;
    };
    pfeType: string;
    has_slot(name: string): Element;
    has_slots(name: string): Element[];
    constructor(pfeClass: any, options?: IPFElementOptions);
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(attr: string, oldVal: string, newVal: string): void;
    _copyAttribute(name: string, to: string): void;
    _mapSchemaToProperties(tag: string, properties: object): void;
    _hasDependency(tag: string, opts: IPFElementDependencyOpts): boolean;
    _mapSchemaToSlots(tag: any, slots: any): void;
    _queueAction(action: any): void;
    _processQueue(): void;
    _setProperty({ name, value }: {
        name: any;
        value: any;
    }): void;
    static var(name: any, element?: HTMLElement): string;
    var(name: any): string;
    render(): void;
    log(...msgs: any[]): void;
}