'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * useIntersectionObserver
 * -----------------------
 * A typed React hook that wraps the **Intersection Observer** API, letting you
 * track when a specific DOM element enters or leaves the viewport (or any root
 * scrolling container).
 * 
 * @param ref — `React.RefObject<T>` that points to the element you want observed.
 * @param options — Optional configuration:
 * | Option | Type | Default | Description |
 * | ------ | ---- | ------- | ----------- |
 * | `root` | `Element | null` | `null` | The root element used to compute intersection. `null` = viewport. |
 * | `rootMargin` | `string` | `'0px'` | CSS margin string to grow/shrink root’s bounds. |
 * | `threshold` | `number | number[]` | `0` | Percentage(s) of target visibility that trigger the observer. |
 * | `once` | `boolean` | `false` | If `true`, unobserves after the first time the target becomes visible. |
 * | `enabled` | `boolean` | `true` | Toggle the observer on/off without unmounting the hook. |
 * | `onIntersect` | `(entry) => void` | `undefined` | Callback fired *every* time intersection state changes (after the hook sets state). |
 *
 * @returns `[isIntersecting, entry]`
 * * **`isIntersecting`** – `boolean` indicating whether the element is currently in view.
 * * **`entry`** – The latest `IntersectionObserverEntry` (or `undefined` until first fire).
 *
 * ---
 *
 * @example **Basic usage**
 * ```tsx
 * const boxRef = useRef<HTMLDivElement>(null);
 * const [inView] = useIntersectionObserver(boxRef, { threshold: 0.25 });
 *
 * return <div ref={boxRef}>{inView ? '👀' : 'Scroll more…'}</div>;
 * ```
 *
 * @example **Load-more on visibility**
 * ```tsx
 * const sentinelRef = useRef<HTMLDivElement>(null);
 * useIntersectionObserver(sentinelRef, {
 *   onIntersect: () => fetchNextPage(),
 *   once: false,       // keep observing for pagination
 *   threshold: 0.1,
 * });
 * ```
 */

interface OptionsType extends IntersectionObserverInit {
    /** Stop observing after first intersection */
    once: boolean
    /** Disable observer without detaching hook logic */
    enabled: boolean
    /** Fired after internal state is updated */
    onIntersect?: (entry: IntersectionObserverEntry) => void
}

export function useIntersectionObserver<T extends Element = Element> (
    ref: React.RefObject<T>,
    options: Partial<OptionsType> = {},
): [boolean, IntersectionObserverEntry | undefined] {
    const {
        root = null,
        rootMargin = '0px',
        threshold = 0,
        once = false,
        enabled = true,
        onIntersect,
    } = options

    // Preserve latest callback without re-subscribing observer each render.
    const savedCallback = useRef(onIntersect)
    savedCallback.current = onIntersect

    const [entry, setEntry] = useState<IntersectionObserverEntry>()
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        if (!enabled) return
        if (typeof IntersectionObserver === 'undefined') return

        const target = ref.current
        if (!target) return

        const observer = new IntersectionObserver(
            ([e]) => {
                setEntry(e)
                setIsIntersecting(e.isIntersecting)

                if (e.isIntersecting && savedCallback.current) {
                    savedCallback.current(e)
                }
                if (e.isIntersecting && once) {
                    observer.unobserve(e.target)
                }
            },
            { root, rootMargin, threshold },
        )

        observer.observe(target)
        return () => observer.disconnect()

    }, [ref, root, rootMargin, JSON.stringify(threshold), once, enabled])

    return [isIntersecting, entry]
}
