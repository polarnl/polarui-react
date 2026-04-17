import React from 'react';
import { gsap } from 'gsap';
import { cn } from './cn.js';

export type TabsScheme = 'light' | 'dark';

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  scheme?: TabsScheme;
  tabs?: string[];
  activeTab?: string;
  defaultActiveTab?: string;
  onActiveTabChange?: (tab: string) => void;
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

const defaultTabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

const schemeConfig: Record<TabsScheme, { inactiveText: string }> = {
  light: {
    inactiveText: '#171717',
  },
  dark: {
    inactiveText: '#475569',
  },
};

const activeColor = '#38bdf8';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function clampIndex(index: number, length: number) {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

function getTabIndex(tabs: string[], tab?: string) {
  if (tab === undefined) {
    return -1;
  }

  return tabs.indexOf(tab);
}

function resolveFallbackIndex(tabs: string[], defaultActiveTab?: string, defaultActiveIndex?: number) {
  const defaultTabIndex = getTabIndex(tabs, defaultActiveTab);

  if (defaultTabIndex !== -1) {
    return defaultTabIndex;
  }

  if (defaultActiveIndex !== undefined) {
    return clampIndex(defaultActiveIndex, tabs.length);
  }

  return tabs.length > 0 ? tabs.length - 1 : 0;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      scheme = 'light',
      tabs = defaultTabs,
      activeTab,
      defaultActiveTab,
      onActiveTabChange,
      activeIndex,
      defaultActiveIndex,
      onActiveIndexChange,
      className,
      'aria-label': ariaLabel = 'Tabs',
      ...props
    },
    ref
  ) => {
    const resolvedTabs = tabs.length > 0 ? tabs : defaultTabs;
    const fallbackActiveIndex = resolveFallbackIndex(resolvedTabs, defaultActiveTab, defaultActiveIndex);
    const [internalActiveIndex, setInternalActiveIndex] = React.useState(fallbackActiveIndex);
    const activeTabIndex = getTabIndex(resolvedTabs, activeTab);
    const selectedIndex =
      activeTabIndex !== -1
        ? activeTabIndex
        : activeTab !== undefined
          ? fallbackActiveIndex
          : activeIndex !== undefined
            ? clampIndex(activeIndex, resolvedTabs.length)
            : internalActiveIndex;

    const markerRef = React.useRef<HTMLSpanElement | null>(null);
    const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const hasMountedRef = React.useRef(false);
    const schemeColors = schemeConfig[scheme];
    const tabsKey = resolvedTabs.join('\u0000');

    const setTabRef = React.useCallback(
      (index: number) => (node: HTMLButtonElement | null) => {
        tabRefs.current[index] = node;
      },
      []
    );

    const activateTab = React.useCallback(
      (index: number) => {
        const nextIndex = clampIndex(index, resolvedTabs.length);
        const nextTab = resolvedTabs[nextIndex] ?? resolvedTabs[0]!;

        if (activeTab === undefined && activeIndex === undefined) {
          setInternalActiveIndex(nextIndex);
        }

        onActiveTabChange?.(nextTab);
        onActiveIndexChange?.(nextIndex);
      },
      [activeTab, activeIndex, onActiveTabChange, onActiveIndexChange, resolvedTabs]
    );

    const syncMarker = React.useCallback(
      (animate: boolean) => {
        const marker = markerRef.current;
        const activeTab = tabRefs.current[selectedIndex];

        if (!marker || !activeTab) {
          return;
        }

        const nextX = activeTab.offsetLeft;
        const nextWidth = activeTab.offsetWidth;

        gsap.killTweensOf(marker);

        if (!hasMountedRef.current || !animate) {
          gsap.set(marker, {
            x: nextX,
            width: nextWidth,
          });
          hasMountedRef.current = true;
          return;
        }

        gsap.to(marker, {
          x: nextX,
          width: nextWidth,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      },
      [selectedIndex]
    );

    useIsomorphicLayoutEffect(() => {
      syncMarker(hasMountedRef.current);
    }, [syncMarker, tabsKey]);

    React.useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      const handleResize = () => {
        syncMarker(false);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [syncMarker]);

    const handleTabKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (resolvedTabs.length === 0) {
          return;
        }

        const lastIndex = resolvedTabs.length - 1;
        let nextIndex: number | null = null;

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            nextIndex = index === lastIndex ? 0 : index + 1;
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            nextIndex = index === 0 ? lastIndex : index - 1;
            break;
          case 'Home':
            nextIndex = 0;
            break;
          case 'End':
            nextIndex = lastIndex;
            break;
          default:
            return;
        }

        event.preventDefault();
        activateTab(nextIndex);
        tabRefs.current[nextIndex]?.focus();
      },
      [activateTab, resolvedTabs.length]
    );

    if (resolvedTabs.length === 0) {
      return null;
    }

    return (
      <div ref={ref} data-scheme={scheme} className={cn('inline-flex flex-col items-start', className)} {...props}>
        <div role="tablist" aria-label={ariaLabel} className="relative inline-flex items-end">
          {resolvedTabs.map((label, index) => {
            const isActive = index === selectedIndex;

            return (
              <button
                key={`${label}-${index}`}
                ref={setTabRef(index)}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                data-active={isActive}
                onClick={() => activateTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={cn(
                  'relative z-10 shrink-0 min-h-12 px-4 py-3',
                  'inline-flex items-center justify-center',
                  'border-b-2 border-transparent',
                  'font-bold text-[16px] leading-5.5 tracking-[-0.112px]',
                  'transition-colors duration-200 ease-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                  'cursor-pointer'
                )}
                style={{
                  color: isActive ? activeColor : schemeColors.inactiveText,
                }}
              >
                {label}
              </button>
            );
          })}

          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-[#cbd5e1]" />
          <span
            ref={markerRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-[#38bdf8]"
            style={{ width: 0 }}
          />
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;