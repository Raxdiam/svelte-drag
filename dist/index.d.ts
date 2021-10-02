declare type SvelteDragBoundsCoords = {
    /** Number of pixels from left of the document */
    left: number;
    /** Number of pixels from top of the document */
    top: number;
    /** Number of pixels from the right side of document */
    right: number;
    /** Number of pixels from the bottom of the document */
    bottom: number;
};
declare type SvelteDragAxis = 'both' | 'x' | 'y' | 'none';
declare type SvelteDragBounds = 'parent' | Partial<SvelteDragBoundsCoords> | string;
declare type SvelteDragOptions = {
    /**
     * Optionally limit the drag area
     *
     * Accepts `parent` as prefixed value, and limits it to its parent.
     *
     * Or, you can specify any selector and it will be bound to that.
     *
     * **Note**: We don't check whether the selector is bigger than the node element.
     * You yourself will have to make sure of that, or it may lead to strange behavior
     *
     * Or, finally, you can pass an object of type `{ top: number; right: number; bottom: number; left: number }`.
     * These mimic the css `top`, `right`, `bottom` and `left`, in the sense that `bottom` starts from the bottom of the window, and `right` from right of window.
     * If any of these properties are unspecified, they are assumed to be `0`.
     *
     * @example
     * ```svelte
     * <!-- Bound to parent element -->
     * <div use:draggable={{ bounds: 'parent' }}>
     *   Hello
     * </div>
     * ```
     *
     * @example
     * ```svelte
     * <!-- Bound to body -->
     * <div use:draggable={{ bounds: 'body' }}>
     *   Hello
     * </div>
     * ```
     *
     * @example
     * ```svelte
     * <!-- Bound to arbitrary coordinates -->
     * <div use:draggable={{ bounds: { top: 100, right: 100, bottom: 100, left: 100 } }}>
     *   Hello
     * </div>
     * ```
     */
    bounds?: SvelteDragBounds;
    /**
     * Axis on which the element can be dragged on. Valid values: `both`, `x`, `y`, `none`.
     *
     * - `both` - Element can move in any direction
     * - `x` - Only horizontal movement possible
     * - `y` - Only vertical movement possible
     * - `none` - No movement at all
     *
     * @default 'both'
     *
     * @example
     * ```svelte
     * <!-- Drag only in x direction -->
     * <div use:draggable={{ axis: 'x' }}>
     *   Text
     * </div>
     * ```
     */
    axis?: SvelteDragAxis;
    /**
     * If true, uses `translate3d` instead of `translate` to move the element around, and the hardware acceleration kicks in.
     *
     * `true` by default, but can be set to `false` if [blurry text issue](https://developpaper.com/question/why-does-the-use-of-css3-translate3d-result-in-blurred-display/) occur
     *
     * @default true
     *
     * @example
     * ```svelte
     * <!-- Disable GPU acceleration -->
     * <div use:draggable={{ gpuAcceleration: false }}>
     *   Text
     * </div>
     * ```
     */
    gpuAcceleration?: boolean;
    /**
     * Applies `user-select: none` on `<body />` element when dragging,
     * to prevent the irritating effect where dragging doesn't happen and the text is selected.
     * Applied when dragging starts and removed when it stops.
     *
     * Can be disabled using this option
     *
     * @default true
     *
     * @example
     * ```svelte
     * <!-- Do not disable user selection -->
     * <div use:draggable={{ applyUserSelectHack: false }}>
     *   Text
     * </div>
     * ```
     */
    applyUserSelectHack?: boolean;
    /**
     * Disables dragging altogether.
     *
     * @default false
     *
     * @example
     * ```svelte
     * <!-- Disable it entirely -->
     * <div use:draggable={{ disabled: true }}>
     *   Text
     * </div>
     * ```
     */
    disabled?: boolean;
    /**
     * Applies a grid on the page to which the element snaps to when dragging, rather than the default continuous grid.
     *
     * `Note`: If you're programmatically creating the grid, do not set it to [0, 0] ever, that will stop drag at all. Set it to `undefined`.
     *
     * @default undefined
     *
     * @example
     * ```svelte
     * <!-- Snap to a grid of 10 by 10 -->
     * <div use:draggable={{ grid: [10, 10] }}>
     *   Text
     * </div>
     * ```
     */
    grid?: [number, number];
    /**
     * CSS Selector of an element inside the parent node(on which `use:draggable` is applied).
     *
     * If it is provided, Trying to drag inside the `cancel` selector will prevent dragging.
     *
     * @default undefined
     *
     * @example
     * <!-- Grid has a cancel element -->
     * <div use:draggable={{ cancel: '.cancel' }}>
     *   Text
     *   <div class="cancel">This won't drag</div>
     * </div>
     * ```
     */
    cancel?: string;
    /**
     * CSS Selector of an element inside the parent node(on which `use:draggable` is applied).
     *
     * If it is provided, Only clicking and dragging on this element will allow the parent to drag, anywhere else on the parent won't work.
     *
     * @default undefined
     *
     * @example
     * <!-- Grid has a handle element -->
     * <div use:draggable={{ handle: '.handel' }}>
     *   This won't drag
     *   <div class="handel">This sure will drag!!</div>
     * </div>
     * ```
     */
    handle?: string;
    /**
     * Class to apply on the element on which `use:draggable` is applied.
     * Note that if `handle` is provided, it will still apply class on the parent element, **NOT** the handle
     *
     * @default 'svelte-draggable'
     */
    defaultClass?: string;
    /**
     * Class to apply on the parent element when it is dragging
     *
     * @default 'svelte-draggable-dragging'
     */
    defaultClassDragging?: string;
    /**
     * Class to apply on the parent element if it has been dragged at least once.
     *
     * @default 'svelte-draggable-dragged'
     */
    defaultClassDragged?: string;
    /**
     * Offsets your element to the position you specify in the very beginning.
     * `x` and `y` should be in pixels
     *
     
     *
     * @example
     * <!-- Place the element at (300, 200) at the very beginning -->
     * <div use:draggable={{ defaultPosition: { x: 300; y: 200 } }}>
     *   Hello
     * </div>
     * ```
     */
    defaultPosition?: {
        x: number;
        y: number;
    };
};
declare const draggable: (node: HTMLElement, options?: SvelteDragOptions) => {
    destroy: () => void;
    update: (options: SvelteDragOptions) => void;
};

export { SvelteDragAxis, SvelteDragBounds, SvelteDragBoundsCoords, SvelteDragOptions, draggable };
