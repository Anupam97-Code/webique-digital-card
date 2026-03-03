
import React, { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../../Hooks/useIsMobile';
gsap.registerPlugin(ScrollTrigger);


// type text animation

export const TextType = ({
    text,
    as: Component = 'div',
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = '',
    showCursor = true,
    cursorCharacter = '|',
    cursorClassName = '',
    cursorBlinkDuration = 0.5,
    textColors = [],
    startOnVisible = false,
    onSentenceComplete,
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);

    // Refs to prevent the "Dependency Storm" that causes lag
    const typingTimeoutRef = useRef(null);
    const containerRef = useRef(null);
    const cursorRef = useRef(null);

    // Internal state tracking without re-renders
    const stateRef = useRef({
        index: 0,
        isDeleting: false,
        textIdx: 0
    });

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    // 1. GSAP Cleanup: Handles the "Third Visit Crash"
    useEffect(() => {
        if (!showCursor || !cursorRef.current) return;

        let ctx = gsap.context(() => {
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: "steps(1)" // "Steps" is lighter on the CPU than power2
            });
        });

        return () => ctx.revert();
    }, [showCursor, cursorBlinkDuration]);

    // 2. Intersection Observer
    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1 });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    // 3. Optimized Typing Logic
    const tick = useCallback(() => {
        const { index, isDeleting, textIdx } = stateRef.current;
        const currentFullText = textArray[textIdx];

        if (isDeleting) {
            // Deleting logic
            if (index > 0) {
                setDisplayedText(currentFullText.substring(0, index - 1));
                stateRef.current.index--;
                typingTimeoutRef.current = setTimeout(tick, deletingSpeed);
            } else {
                // Done deleting
                stateRef.current.isDeleting = false;
                stateRef.current.textIdx = (textIdx + 1) % textArray.length;
                if (onSentenceComplete) onSentenceComplete(currentFullText, textIdx);

                if (!loop && stateRef.current.textIdx === 0) return;
                typingTimeoutRef.current = setTimeout(tick, typingSpeed);
            }
        } else {
            // Typing logic
            if (index < currentFullText.length) {
                setDisplayedText(currentFullText.substring(0, index + 1));
                stateRef.current.index++;
                typingTimeoutRef.current = setTimeout(tick, typingSpeed);
            } else {
                // Done typing, wait before deleting
                if (!loop && textIdx === textArray.length - 1) return;
                stateRef.current.isDeleting = true;
                typingTimeoutRef.current = setTimeout(tick, pauseDuration);
            }
        }
    }, [textArray, typingSpeed, deletingSpeed, pauseDuration, loop, onSentenceComplete]);

    useEffect(() => {
        if (!isVisible) return;

        typingTimeoutRef.current = setTimeout(tick, initialDelay);

        return () => {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        };
    }, [isVisible, tick, initialDelay]);

    const textColor = textColors.length > 0 ? textColors[currentTextIndex % textColors.length] : 'inherit';

    return createElement(
        Component,
        { ref: containerRef, className: `text-type ${className}`, ...props },
        <span style={{ color: textColor }}>{displayedText}</span>,
        showCursor && (
            <span ref={cursorRef} className={`text-type__cursor ${cursorClassName}`}>
                {cursorCharacter}
            </span>
        )
    );
};
// ===================================

// textbottom blur animation
const buildKeyframes = (from, steps) => {
    const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

    const keyframes = {};
    keys.forEach(k => {
        keyframes[k] = [from[k], ...steps.map(s => s[k])];
    });
    return keyframes;
};

export const BlurText = ({
    text = '',
    delay = 200,
    className = '',
    animateBy = 'words',
    direction = 'bottom',
    threshold = 0.1,
    rootMargin = '0px',
    animationFrom,
    animationTo,
    easing = t => t,
    onAnimationComplete,
    stepDuration = 0.35
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    const defaultFrom = useMemo(
        () =>
            direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
        [direction]
    );

    const defaultTo = useMemo(
        () => [
            {
                filter: 'blur(5px)',
                opacity: 0.5,
                y: direction === 'top' ? 5 : -5
            },
            { filter: 'blur(0px)', opacity: 1, y: 0 }
        ],
        [direction]
    );

    const fromSnapshot = animationFrom ?? defaultFrom;
    const toSnapshots = animationTo ?? defaultTo;

    const stepCount = toSnapshots.length + 1;
    const totalDuration = stepDuration * (stepCount - 1);
    const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

    return (
        <div ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {elements.map((segment, index) => {
                const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

                const spanTransition = {
                    duration: totalDuration,
                    times,
                    delay: (index * delay) / 1000
                };
                spanTransition.ease = easing;

                return (
                    <motion.h2
                        className="inline-block section-heading m-0 will-change-[transform,filter,opacity]"
                        key={index}
                        initial={fromSnapshot}
                        animate={inView ? animateKeyframes : fromSnapshot}
                        transition={spanTransition}
                        onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
                    >
                        {segment === ' ' ? '\u00A0' : segment}
                        {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                    </motion.h2>
                );
            })}
        </div>
    );
};
// ===================================

// scroll float text
export const ScrollFloat = ({
    children,
    scrollContainerRef,
    containerClassName = '',
    textClassName = '',
    animationDuration = 1,
    ease = 'back.inOut(2)',
    scrollStart = 'center bottom+=50%',
    scrollEnd = 'bottom bottom-=40%',
    stagger = 0.03
}) => {
    const containerRef = useRef(null);

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split('').map((char, index) => (
            <span className="char" key={index}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

        const charElements = el.querySelectorAll('.char');

        gsap.fromTo(
            charElements,
            {
                willChange: 'opacity, transform',
                opacity: 0,
                yPercent: 120,
                scaleY: 2.3,
                scaleX: 0.7,
                transformOrigin: '50% 0%'
            },
            {
                duration: animationDuration,
                ease: ease,
                opacity: 1,
                yPercent: 0,
                scaleY: 1,
                scaleX: 1,
                stagger: stagger,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: scrollStart,
                    end: scrollEnd,
                    scrub: true
                }
            }
        );
    }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

    return (
        <h2 ref={containerRef} className={`scroll-float text-center ${containerClassName}`}>
            <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
        </h2>
    );
};
// ===================================

// animation content
export const AnimatedContent = ({
    children,
    animationBreakpoint = 768,
    container,
    distance = 100,
    direction = 'vertical',
    reverse = false,
    duration = 0.8,
    ease = 'power3.out',
    initialOpacity = 0,
    animateOpacity = true,
    scale = 1,
    threshold = 0.1,
    delay = 0,
    disappearAfter = 0,
    disappearDuration = 0.5,
    disappearEase = 'power3.in',
    onComplete,
    onDisappearanceComplete,
    className = '',
    ...props
}) => {
    const ref = useRef(null);
    // Use a ref for props that might change but shouldn't re-trigger the effect
    const callbacksRef = useRef({ onComplete, onDisappearanceComplete });

    // Keep callbacks updated without re-running the effect
    useEffect(() => {
        callbacksRef.current = { onComplete, onDisappearanceComplete };
    }, [onComplete, onDisappearanceComplete]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const breakpoint = animationBreakpoint || 0;

        // disable animation on custome screen 
        if (window.innerWidth < breakpoint) {
            gsap.set(el, {
                clearProps: 'all',
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                visibility: 'visible'
            });
            return;
        }

        let ctx = gsap.context(() => {
            const axis = direction === 'horizontal' ? 'x' : 'y';
            const offset = reverse ? -distance : distance;
            const startPct = (1 - threshold) * 100;

            gsap.set(el, {
                [axis]: offset,
                scale,
                opacity: animateOpacity ? initialOpacity : 1,
                visibility: 'visible'
            });

            const tl = gsap.timeline({
                paused: true,
                delay,
                onComplete: () => {
                    callbacksRef.current.onComplete?.();

                    if (disappearAfter > 0) {
                        gsap.to(el, {
                            [axis]: reverse ? distance : -distance,
                            scale: 0.8,
                            opacity: animateOpacity ? initialOpacity : 0,
                            delay: disappearAfter,
                            duration: disappearDuration,
                            ease: disappearEase,
                            onComplete: () =>
                                callbacksRef.current.onDisappearanceComplete?.()
                        });
                    }
                }
            });

            tl.to(el, {
                [axis]: 0,
                scale: 1,
                opacity: 1,
                duration,
                ease,
                force3D: true
            });

            ScrollTrigger.create({
                trigger: el,
                scroller:
                    container ||
                    document.getElementById('snap-main-container') ||
                    window,
                start: `top ${startPct}%`,
                onEnter: () => tl.play(),
                toggleActions: 'play none none none'
            });
        });

        return () => ctx.revert();
    }, []);  // Empty array: only run ONCE on mount

    return (
        <div ref={ref} className={className} style={{ visibility: 'hidden' }} {...props}>
            {children}
        </div>
    );
};
// =======================