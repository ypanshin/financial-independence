var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var setStyleProperty = function (element, propertyName, value) {
    element.style.setProperty(propertyName, value);
};
var removeStyleProperty = function (element, propertyName) {
    element.style.removeProperty(propertyName);
};
var animationEnd = function (el, callback) {
    var unRegTrans;
    var opts = { passive: true };
    var unregister = function () {
        if (unRegTrans) {
            unRegTrans();
        }
    };
    var onTransitionEnd = function (ev) {
        if (el === ev.target) {
            unregister();
            callback(ev);
        }
    };
    if (el) {
        el.addEventListener('webkitAnimationEnd', onTransitionEnd, opts);
        el.addEventListener('animationend', onTransitionEnd, opts);
        unRegTrans = function () {
            el.removeEventListener('webkitAnimationEnd', onTransitionEnd, opts);
            el.removeEventListener('animationend', onTransitionEnd, opts);
        };
    }
    return unregister;
};
var generateKeyframeRules = function (keyframes) {
    if (keyframes === void 0) { keyframes = []; }
    return keyframes.map(function (keyframe) {
        var offset = keyframe.offset;
        var frameString = [];
        for (var property in keyframe) {
            if (keyframe.hasOwnProperty(property) && property !== 'offset') {
                frameString.push(property + ": " + keyframe[property] + ";");
            }
        }
        return offset * 100 + "% { " + frameString.join(' ') + " }";
    }).join(' ');
};
var keyframeIds = [];
var generateKeyframeName = function (keyframeRules) {
    var index = keyframeIds.indexOf(keyframeRules);
    if (index < 0) {
        index = (keyframeIds.push(keyframeRules) - 1);
    }
    return "ion-animation-" + index;
};
var getStyleContainer = function (element) {
    var rootNode = element.getRootNode();
    return (rootNode.head || rootNode);
};
var createKeyframeStylesheet = function (keyframeName, keyframeRules, element) {
    var styleContainer = getStyleContainer(element);
    var existingStylesheet = styleContainer.querySelector('#' + keyframeName);
    if (existingStylesheet) {
        return existingStylesheet;
    }
    var stylesheet = (element.ownerDocument || document).createElement('style');
    stylesheet.id = keyframeName;
    stylesheet.innerHTML = "@keyframes " + keyframeName + " { " + keyframeRules + " } @keyframes " + keyframeName + "-alt { " + keyframeRules + " }";
    styleContainer.appendChild(stylesheet);
    return stylesheet;
};
var addClassToArray = function (classes, className) {
    if (classes === void 0) { classes = []; }
    if (className !== undefined) {
        var classNameToAppend = (Array.isArray(className)) ? className : [className];
        return __spreadArrays(classes, classNameToAppend);
    }
    return classes;
};
// TODO: Add more tests. until then, be sure to manually test menu and swipe to go back/routing transitions
var createAnimation = function () {
    var _delay;
    var _duration;
    var _easing;
    var _iterations;
    var _fill;
    var _direction;
    var _keyframes = [];
    var beforeAddClasses = [];
    var beforeRemoveClasses = [];
    var initialized = false;
    var parentAnimation;
    var beforeStylesValue = {};
    var afterAddClasses = [];
    var afterRemoveClasses = [];
    var afterStylesValue = {};
    var numAnimationsRunning = 0;
    var shouldForceLinearEasing = false;
    var shouldForceSyncPlayback = false;
    var cssAnimationsTimerFallback;
    var forceDirectionValue;
    var forceDurationValue;
    var forceDelayValue;
    var willComplete = true;
    var finished = false;
    var shouldCalculateNumAnimations = true;
    var keyframeName;
    var ani;
    var onFinishCallbacks = [];
    var onFinishOneTimeCallbacks = [];
    var elements = [];
    var childAnimations = [];
    var stylesheets = [];
    var _beforeAddReadFunctions = [];
    var _beforeAddWriteFunctions = [];
    var _afterAddReadFunctions = [];
    var _afterAddWriteFunctions = [];
    var webAnimations = [];
    var supportsWebAnimations = (typeof Element === 'function') && (typeof Element.prototype.animate === 'function');
    var ANIMATION_END_FALLBACK_PADDING_MS = 100;
    /**
     * Returns the raw Web Animations object
     * for all elements in an Animation.
     * This will return an empty array on
     * browsers that do not support
     * the Web Animations API.
     */
    var getWebAnimations = function () {
        return webAnimations;
    };
    /**
     * Destroy the animation and all child animations.
     */
    var destroy = function () {
        childAnimations.forEach(function (childAnimation) {
            childAnimation.destroy();
        });
        cleanUp();
        elements.length = 0;
        childAnimations.length = 0;
        _keyframes.length = 0;
        clearOnFinish();
        initialized = false;
        shouldCalculateNumAnimations = true;
        return ani;
    };
    /**
     * Cancels any Web Animations, removes
     * any animation properties from the
     * animation's elements, and removes the
     * animation's stylesheets from the DOM.
     */
    var cleanUp = function () {
        cleanUpElements();
        cleanUpStyleSheets();
    };
    /**
     * Add a callback to be run
     * upon the animation ending
     */
    var onFinish = function (callback, opts) {
        var callbacks = (opts && opts.oneTimeCallback) ? onFinishOneTimeCallbacks : onFinishCallbacks;
        callbacks.push({ callback: callback, opts: opts });
        return ani;
    };
    /**
     * Clears all callbacks
     */
    var clearOnFinish = function () {
        onFinishCallbacks.length = 0;
        onFinishOneTimeCallbacks.length = 0;
        return ani;
    };
    /**
     * Cancels any Web Animations and removes
     * any animation properties from the
     * the animation's elements.
     */
    var cleanUpElements = function () {
        if (supportsWebAnimations) {
            getWebAnimations().forEach(function (animation) {
                animation.cancel();
            });
            webAnimations.length = 0;
        }
        else {
            elements.forEach(function (element) {
                requestAnimationFrame(function () {
                    removeStyleProperty(element, 'animation-name');
                    removeStyleProperty(element, 'animation-duration');
                    removeStyleProperty(element, 'animation-timing-function');
                    removeStyleProperty(element, 'animation-iteration-count');
                    removeStyleProperty(element, 'animation-delay');
                    removeStyleProperty(element, 'animation-play-state');
                    removeStyleProperty(element, 'animation-fill-mode');
                    removeStyleProperty(element, 'animation-direction');
                });
            });
        }
    };
    /**
     * Removes the animation's stylesheets
     * from the DOM.
     */
    var cleanUpStyleSheets = function () {
        stylesheets.forEach(function (stylesheet) {
            /**
             * When sharing stylesheets, it's possible
             * for another animation to have already
             * cleaned up a particular stylesheet
             */
            if (stylesheet && stylesheet.parentNode) {
                stylesheet.parentNode.removeChild(stylesheet);
            }
        });
        stylesheets.length = 0;
    };
    /**
     * Add a function that performs a
     * DOM read to be run before the
     * animation starts
     */
    var beforeAddRead = function (readFn) {
        _beforeAddReadFunctions.push(readFn);
        return ani;
    };
    /**
     * Add a function that performs a
     * DOM write to be run before the
     * animation starts
     */
    var beforeAddWrite = function (writeFn) {
        _beforeAddWriteFunctions.push(writeFn);
        return ani;
    };
    /**
     * Add a function that performs a
     * DOM read to be run after the
     * animation end
     */
    var afterAddRead = function (readFn) {
        _afterAddReadFunctions.push(readFn);
        return ani;
    };
    /**
     * Add a function that performs a
     * DOM write to be run after the
     * animation end
     */
    var afterAddWrite = function (writeFn) {
        _afterAddWriteFunctions.push(writeFn);
        return ani;
    };
    /**
     * Add a class to the animation's
     * elements before the animation starts
     */
    var beforeAddClass = function (className) {
        beforeAddClasses = addClassToArray(beforeAddClasses, className);
        return ani;
    };
    /**
     * Remove a class from the animation's
     * elements before the animation starts
     */
    var beforeRemoveClass = function (className) {
        beforeRemoveClasses = addClassToArray(beforeRemoveClasses, className);
        return ani;
    };
    /**
     * Set CSS inline styles to the animation's
     * elements before the animation begins.
     */
    var beforeStyles = function (styles) {
        if (styles === void 0) { styles = {}; }
        beforeStylesValue = styles;
        return ani;
    };
    /**
     * Clear CSS inline styles from the animation's
     * elements before the animation begins.
     */
    var beforeClearStyles = function (propertyNames) {
        if (propertyNames === void 0) { propertyNames = []; }
        for (var _i = 0, propertyNames_1 = propertyNames; _i < propertyNames_1.length; _i++) {
            var property = propertyNames_1[_i];
            beforeStylesValue[property] = '';
        }
        return ani;
    };
    /**
     * Add CSS class to the animation's
     * elements after the animation ends.
     */
    var afterAddClass = function (className) {
        afterAddClasses = addClassToArray(afterAddClasses, className);
        return ani;
    };
    /**
     * Remove CSS class from the animation's
     * elements after the animation ends.
     */
    var afterRemoveClass = function (className) {
        afterRemoveClasses = addClassToArray(afterRemoveClasses, className);
        return ani;
    };
    /**
     * Set CSS inline styles to the animation's
     * elements after the animation ends.
     */
    var afterStyles = function (styles) {
        if (styles === void 0) { styles = {}; }
        afterStylesValue = styles;
        return ani;
    };
    /**
     * Clear CSS inline styles from the animation's
     * elements after the animation ends.
     */
    var afterClearStyles = function (propertyNames) {
        if (propertyNames === void 0) { propertyNames = []; }
        for (var _i = 0, propertyNames_2 = propertyNames; _i < propertyNames_2.length; _i++) {
            var property = propertyNames_2[_i];
            afterStylesValue[property] = '';
        }
        return ani;
    };
    /**
     * Returns the animation's fill mode.
     */
    var getFill = function () {
        if (_fill !== undefined) {
            return _fill;
        }
        if (parentAnimation) {
            return parentAnimation.getFill();
        }
        return undefined;
    };
    /**
     * Returns the animation's direction.
     */
    var getDirection = function () {
        if (forceDirectionValue !== undefined) {
            return forceDirectionValue;
        }
        if (_direction !== undefined) {
            return _direction;
        }
        if (parentAnimation) {
            return parentAnimation.getDirection();
        }
        return undefined;
    };
    /**
     * Returns the animation's easing.
     */
    var getEasing = function () {
        if (shouldForceLinearEasing) {
            return 'linear';
        }
        if (_easing !== undefined) {
            return _easing;
        }
        if (parentAnimation) {
            return parentAnimation.getEasing();
        }
        return undefined;
    };
    /**
     * Gets the animation's duration in milliseconds.
     */
    var getDuration = function () {
        if (shouldForceSyncPlayback) {
            return 0;
        }
        if (forceDurationValue !== undefined) {
            return forceDurationValue;
        }
        if (_duration !== undefined) {
            return _duration;
        }
        if (parentAnimation) {
            return parentAnimation.getDuration();
        }
        return undefined;
    };
    /**
     * Gets the number of iterations the animation will run.
     */
    var getIterations = function () {
        if (_iterations !== undefined) {
            return _iterations;
        }
        if (parentAnimation) {
            return parentAnimation.getIterations();
        }
        return undefined;
    };
    /**
     * Gets the animation's delay in milliseconds.
     */
    var getDelay = function () {
        if (forceDelayValue !== undefined) {
            return forceDelayValue;
        }
        if (_delay !== undefined) {
            return _delay;
        }
        if (parentAnimation) {
            return parentAnimation.getDelay();
        }
        return undefined;
    };
    /**
     * Get an array of keyframes for the animation.
     */
    var getKeyframes = function () {
        return _keyframes;
    };
    /**
     * Sets whether the animation should play forwards,
     * backwards, or alternating back and forth.
     */
    var direction = function (animationDirection) {
        _direction = animationDirection;
        update(true);
        return ani;
    };
    /**
     * Sets how the animation applies styles to its
     * elements before and after the animation's execution.
     */
    var fill = function (animationFill) {
        _fill = animationFill;
        update(true);
        return ani;
    };
    /**
     * Sets when an animation starts (in milliseconds).
     */
    var delay = function (animationDelay) {
        _delay = animationDelay;
        update(true);
        return ani;
    };
    /**
     * Sets how the animation progresses through the
     * duration of each cycle.
     */
    var easing = function (animationEasing) {
        _easing = animationEasing;
        update(true);
        return ani;
    };
    /**
     * Sets the length of time the animation takes
     * to complete one cycle.
     */
    var duration = function (animationDuration) {
        _duration = animationDuration;
        update(true);
        return ani;
    };
    /**
     * Sets the number of times the animation cycle
     * should be played before stopping.
     */
    var iterations = function (animationIterations) {
        _iterations = animationIterations;
        update(true);
        return ani;
    };
    /**
     * Sets the parent animation.
     */
    var parent = function (animation) {
        parentAnimation = animation;
        return ani;
    };
    /**
     * Add one or more elements to the animation
     */
    var addElement = function (el) {
        if (el != null) {
            if (el.nodeType === 1) {
                elements.push(el);
            }
            else if (el.length >= 0) {
                for (var i = 0; i < el.length; i++) {
                    elements.push(el[i]);
                }
            }
            else {
                console.error('Invalid addElement value');
            }
        }
        return ani;
    };
    /**
     * Group one or more animations together to be controlled by a parent animation.
     */
    var addAnimation = function (animationToAdd) {
        if (animationToAdd != null) {
            var parentAnim = ani;
            var animationsToAdd = animationToAdd;
            if (animationsToAdd.length >= 0) {
                for (var _i = 0, animationsToAdd_1 = animationsToAdd; _i < animationsToAdd_1.length; _i++) {
                    var animation = animationsToAdd_1[_i];
                    animation.parent(parentAnim);
                    childAnimations.push(animation);
                }
            }
            else {
                animationToAdd.parent(parentAnim);
                childAnimations.push(animationToAdd);
            }
        }
        return ani;
    };
    /**
     * Set the keyframes for the animation.
     */
    var keyframes = function (keyframeValues) {
        _keyframes = keyframeValues;
        return ani;
    };
    /**
     * Runs all before read callbacks
     */
    var runBeforeRead = function () {
        _beforeAddReadFunctions.forEach(function (callback) {
            callback();
        });
    };
    /**
     * Runs all before write callbacks
     */
    var runBeforeWrite = function () {
        _beforeAddWriteFunctions.forEach(function (callback) {
            callback();
        });
    };
    /**
     * Updates styles and classes before animation runs
     */
    var runBeforeStyles = function () {
        var addClasses = beforeAddClasses;
        var removeClasses = beforeRemoveClasses;
        var styles = beforeStylesValue;
        elements.forEach(function (el) {
            var elementClassList = el.classList;
            elementClassList.add.apply(elementClassList, addClasses);
            elementClassList.remove.apply(elementClassList, removeClasses);
            for (var property in styles) {
                if (styles.hasOwnProperty(property)) {
                    setStyleProperty(el, property, styles[property]);
                }
            }
        });
    };
    /**
     * Run all "before" animation hooks.
     */
    var beforeAnimation = function () {
        runBeforeRead();
        runBeforeWrite();
        runBeforeStyles();
    };
    /**
     * Runs all after read callbacks
     */
    var runAfterRead = function () {
        _afterAddReadFunctions.forEach(function (callback) {
            callback();
        });
    };
    /**
     * Runs all after write callbacks
     */
    var runAfterWrite = function () {
        _afterAddWriteFunctions.forEach(function (callback) {
            callback();
        });
    };
    /**
     * Updates styles and classes before animation ends
     */
    var runAfterStyles = function () {
        var addClasses = afterAddClasses;
        var removeClasses = afterRemoveClasses;
        var styles = afterStylesValue;
        elements.forEach(function (el) {
            var elementClassList = el.classList;
            elementClassList.add.apply(elementClassList, addClasses);
            elementClassList.remove.apply(elementClassList, removeClasses);
            for (var property in styles) {
                if (styles.hasOwnProperty(property)) {
                    setStyleProperty(el, property, styles[property]);
                }
            }
        });
    };
    /**
     * Run all "after" animation hooks.
     */
    var afterAnimation = function () {
        clearCSSAnimationsTimeout();
        runAfterRead();
        runAfterWrite();
        runAfterStyles();
        var didComplete = willComplete;
        onFinishCallbacks.forEach(function (onFinishCallback) {
            onFinishCallback.callback(didComplete, ani);
        });
        onFinishOneTimeCallbacks.forEach(function (onFinishCallback) {
            onFinishCallback.callback(didComplete, ani);
        });
        onFinishOneTimeCallbacks.length = 0;
        shouldCalculateNumAnimations = true;
        finished = true;
    };
    var animationFinish = function () {
        if (numAnimationsRunning === 0) {
            return;
        }
        numAnimationsRunning--;
        if (numAnimationsRunning === 0) {
            afterAnimation();
            if (parentAnimation) {
                parentAnimation.animationFinish();
            }
        }
    };
    var initializeCSSAnimation = function (toggleAnimationName) {
        if (toggleAnimationName === void 0) { toggleAnimationName = true; }
        cleanUpStyleSheets();
        elements.forEach(function (element) {
            if (_keyframes.length > 0) {
                var keyframeRules = generateKeyframeRules(_keyframes);
                keyframeName = generateKeyframeName(keyframeRules);
                var stylesheet_1 = createKeyframeStylesheet(keyframeName, keyframeRules, element);
                stylesheets.push(stylesheet_1);
                setStyleProperty(element, 'animation-duration', (getDuration() !== undefined) ? getDuration() + "ms" : null);
                setStyleProperty(element, 'animation-timing-function', getEasing() || null);
                setStyleProperty(element, 'animation-delay', (getDelay() !== undefined) ? getDelay() + "ms" : null);
                setStyleProperty(element, 'animation-fill-mode', getFill() || null);
                setStyleProperty(element, 'animation-direction', getDirection() || null);
                var iterationsCount = (getIterations() !== undefined) ?
                    (getIterations() === Infinity) ? 'infinite' : getIterations().toString()
                    : null;
                setStyleProperty(element, 'animation-iteration-count', iterationsCount);
                setStyleProperty(element, 'animation-play-state', 'paused');
                if (toggleAnimationName) {
                    setStyleProperty(element, 'animation-name', stylesheet_1.id + "-alt");
                }
                requestAnimationFrame(function () {
                    setStyleProperty(element, 'animation-name', stylesheet_1.id || null);
                });
            }
        });
    };
    var initializeWebAnimation = function () {
        elements.forEach(function (element) {
            var animation = element.animate(_keyframes, {
                delay: getDelay(),
                duration: getDuration(),
                easing: getEasing(),
                iterations: getIterations(),
                fill: getFill(),
                direction: getDirection()
            });
            animation.pause();
            webAnimations.push(animation);
        });
        if (getWebAnimations().length > 0) {
            webAnimations[0].onfinish = function () {
                animationFinish();
            };
        }
    };
    var initializeAnimation = function (toggleAnimationName) {
        if (toggleAnimationName === void 0) { toggleAnimationName = true; }
        beforeAnimation();
        if (_keyframes.length > 0) {
            if (supportsWebAnimations) {
                initializeWebAnimation();
            }
            else {
                initializeCSSAnimation(toggleAnimationName);
            }
        }
        initialized = true;
    };
    var setAnimationStep = function (step) {
        step = Math.min(Math.max(step, 0), 0.999);
        if (supportsWebAnimations) {
            getWebAnimations().forEach(function (animation) {
                animation.currentTime = animation.effect.getComputedTiming().delay + (getDuration() * step);
                animation.pause();
            });
        }
        else {
            var animationDelay = getDelay() || 0;
            var animationDuration_1 = "-" + (animationDelay + (getDuration() * step)) + "ms";
            elements.forEach(function (element) {
                if (_keyframes.length > 0) {
                    setStyleProperty(element, 'animation-delay', animationDuration_1);
                    setStyleProperty(element, 'animation-play-state', 'paused');
                }
            });
        }
    };
    var updateWebAnimation = function () {
        getWebAnimations().forEach(function (animation) {
            animation.effect.updateTiming({
                delay: getDelay(),
                duration: getDuration(),
                easing: getEasing(),
                iterations: getIterations(),
                fill: getFill(),
                direction: getDirection()
            });
        });
    };
    var updateCSSAnimation = function (toggleAnimationName) {
        if (toggleAnimationName === void 0) { toggleAnimationName = true; }
        elements.forEach(function (element) {
            requestAnimationFrame(function () {
                setStyleProperty(element, 'animation-name', keyframeName || null);
                setStyleProperty(element, 'animation-duration', (getDuration() !== undefined) ? getDuration() + "ms" : null);
                setStyleProperty(element, 'animation-timing-function', getEasing() || null);
                setStyleProperty(element, 'animation-delay', (getDelay() !== undefined) ? getDelay() + "ms" : null);
                setStyleProperty(element, 'animation-fill-mode', getFill() || null);
                setStyleProperty(element, 'animation-direction', getDirection() || null);
                var iterationsCount = (getIterations() !== undefined) ?
                    (getIterations() === Infinity) ? 'infinite' : getIterations().toString()
                    : null;
                setStyleProperty(element, 'animation-iteration-count', iterationsCount);
                if (toggleAnimationName) {
                    setStyleProperty(element, 'animation-name', keyframeName + "-alt");
                }
                requestAnimationFrame(function () {
                    setStyleProperty(element, 'animation-name', keyframeName || null);
                });
            });
        });
    };
    /**
     * Updates any existing animations.
     */
    var update = function (deep, toggleAnimationName) {
        if (deep === void 0) { deep = false; }
        if (toggleAnimationName === void 0) { toggleAnimationName = true; }
        if (deep) {
            childAnimations.forEach(function (animation) {
                animation.update(deep);
            });
        }
        if (supportsWebAnimations) {
            updateWebAnimation();
        }
        else {
            updateCSSAnimation(toggleAnimationName);
        }
        return ani;
    };
    var progressStart = function (forceLinearEasing) {
        if (forceLinearEasing === void 0) { forceLinearEasing = false; }
        childAnimations.forEach(function (animation) {
            animation.progressStart(forceLinearEasing);
        });
        pauseAnimation();
        shouldForceLinearEasing = forceLinearEasing;
        if (!initialized) {
            initializeAnimation();
        }
        else {
            update();
            setAnimationStep(0);
        }
        return ani;
    };
    var progressStep = function (step) {
        childAnimations.forEach(function (animation) {
            animation.progressStep(step);
        });
        if (getDuration() !== undefined) {
            setAnimationStep(step);
        }
        return ani;
    };
    var progressEnd = function (shouldComplete, step, dur) {
        shouldForceLinearEasing = false;
        childAnimations.forEach(function (animation) {
            animation.progressEnd(shouldComplete, step, dur);
        });
        if (dur !== undefined) {
            forceDurationValue = dur;
        }
        finished = false;
        willComplete = shouldComplete;
        if (!shouldComplete) {
            forceDirectionValue = (getDirection() === 'reverse') ? 'normal' : 'reverse';
            if (supportsWebAnimations) {
                update();
                setAnimationStep(1 - step);
            }
            else {
                forceDelayValue = ((1 - step) * getDuration()) * -1;
                update(false, false);
            }
        }
        else {
            if (!supportsWebAnimations) {
                forceDelayValue = (step * getDuration()) * -1;
                update(false, false);
            }
        }
        onFinish(function () {
            willComplete = true;
            forceDurationValue = undefined;
            forceDirectionValue = undefined;
            forceDelayValue = undefined;
        }, {
            oneTimeCallback: true
        });
        if (!parentAnimation) {
            play();
        }
        return ani;
    };
    var pauseAnimation = function () {
        if (initialized) {
            if (supportsWebAnimations) {
                getWebAnimations().forEach(function (animation) {
                    animation.pause();
                });
            }
            else {
                elements.forEach(function (element) {
                    setStyleProperty(element, 'animation-play-state', 'paused');
                });
            }
        }
    };
    /**
     * Pause the animation.
     */
    var pause = function () {
        childAnimations.forEach(function (animation) {
            animation.pause();
        });
        pauseAnimation();
        return ani;
    };
    /**
     * Play the animation asynchronously.
     * This returns a promise that resolves
     * when the animation has ended.
     */
    var playAsync = function () {
        return new Promise(function (resolve) {
            onFinish(resolve, { oneTimeCallback: true });
            play();
            return ani;
        });
    };
    /**
     * Play the animation synchronously. This
     * is the equivalent of running the animation
     * with a duration of 0ms.
     */
    var playSync = function () {
        shouldForceSyncPlayback = true;
        onFinish(function () { return shouldForceSyncPlayback = false; }, { oneTimeCallback: true });
        play();
        return ani;
    };
    var onAnimationEndFallback = function () {
        cssAnimationsTimerFallback = undefined;
        animationFinish();
    };
    var clearCSSAnimationsTimeout = function () {
        if (cssAnimationsTimerFallback) {
            clearTimeout(cssAnimationsTimerFallback);
        }
    };
    var playCSSAnimations = function () {
        clearCSSAnimationsTimeout();
        elements.forEach(function (element) {
            if (_keyframes.length > 0) {
                requestAnimationFrame(function () {
                    setStyleProperty(element, 'animation-play-state', 'running');
                });
            }
        });
        if (_keyframes.length === 0 || elements.length === 0) {
            animationFinish();
        }
        else {
            /**
             * This is a catchall in the event that a CSS Animation did not finish.
             * The Web Animations API has mechanisms in place for preventing this.
             * CSS Animations will not fire an `animationend` event
             * for elements with `display: none`. The Web Animations API
             * accounts for this, but using raw CSS Animations requires
             * this workaround.
             */
            var animationDelay = getDelay() || 0;
            var animationDuration = getDuration() || 0;
            cssAnimationsTimerFallback = setTimeout(onAnimationEndFallback, animationDelay + animationDuration + ANIMATION_END_FALLBACK_PADDING_MS);
            animationEnd(elements[0], function () {
                clearCSSAnimationsTimeout();
                /**
                 * Ensure that clean up
                 * is always done a frame
                 * before the onFinish handlers
                 * are fired. Otherwise, there
                 * may be flickering if a new
                 * animation is started on the same
                 * element too quickly
                 *
                 * TODO: Is there a cleaner way to do this?
                 */
                requestAnimationFrame(function () {
                    clearCSSAnimationPlayState();
                    requestAnimationFrame(function () {
                        animationFinish();
                    });
                });
            });
        }
    };
    var clearCSSAnimationPlayState = function () {
        elements.forEach(function (element) {
            removeStyleProperty(element, 'animation-duration');
            removeStyleProperty(element, 'animation-delay');
            removeStyleProperty(element, 'animation-play-state');
        });
    };
    var playWebAnimations = function () {
        getWebAnimations().forEach(function (animation) {
            animation.play();
        });
        if (_keyframes.length === 0 || elements.length === 0) {
            animationFinish();
        }
    };
    var resetAnimation = function () {
        if (supportsWebAnimations) {
            setAnimationStep(0);
        }
        else {
            updateCSSAnimation();
        }
    };
    /**
     * Play the animation
     */
    var play = function () {
        if (!initialized) {
            initializeAnimation();
        }
        if (finished) {
            resetAnimation();
            finished = false;
        }
        if (shouldCalculateNumAnimations) {
            numAnimationsRunning = childAnimations.length + 1;
            shouldCalculateNumAnimations = false;
        }
        childAnimations.forEach(function (animation) {
            animation.play();
        });
        if (supportsWebAnimations) {
            playWebAnimations();
        }
        else {
            playCSSAnimations();
        }
        return ani;
    };
    /**
     * Stop the animation and reset
     * all elements to their initial state
     */
    var stop = function () {
        childAnimations.forEach(function (animation) {
            animation.stop();
        });
        if (initialized) {
            cleanUpElements();
            initialized = false;
        }
        return ani;
    };
    var from = function (property, value) {
        var _a;
        var firstFrame = _keyframes[0];
        if (firstFrame != null && (firstFrame.offset === undefined || firstFrame.offset === 0)) {
            firstFrame[property] = value;
        }
        else {
            _keyframes = __spreadArrays([
                (_a = { offset: 0 }, _a[property] = value, _a)
            ], _keyframes);
        }
        return ani;
    };
    var to = function (property, value) {
        var _a;
        var lastFrame = _keyframes[_keyframes.length - 1];
        if (lastFrame != null && (lastFrame.offset === undefined || lastFrame.offset === 1)) {
            lastFrame[property] = value;
        }
        else {
            _keyframes = __spreadArrays(_keyframes, [
                (_a = { offset: 1 }, _a[property] = value, _a)
            ]);
        }
        return ani;
    };
    var fromTo = function (property, fromValue, toValue) {
        return from(property, fromValue).to(property, toValue);
    };
    return ani = {
        parentAnimation: parentAnimation,
        elements: elements,
        childAnimations: childAnimations,
        animationFinish: animationFinish,
        from: from,
        to: to,
        fromTo: fromTo,
        parent: parent,
        play: play,
        playAsync: playAsync,
        playSync: playSync,
        pause: pause,
        stop: stop,
        destroy: destroy,
        keyframes: keyframes,
        addAnimation: addAnimation,
        addElement: addElement,
        update: update,
        fill: fill,
        direction: direction,
        iterations: iterations,
        duration: duration,
        easing: easing,
        delay: delay,
        getWebAnimations: getWebAnimations,
        getKeyframes: getKeyframes,
        getFill: getFill,
        getDirection: getDirection,
        getDelay: getDelay,
        getIterations: getIterations,
        getEasing: getEasing,
        getDuration: getDuration,
        afterAddRead: afterAddRead,
        afterAddWrite: afterAddWrite,
        afterClearStyles: afterClearStyles,
        afterStyles: afterStyles,
        afterRemoveClass: afterRemoveClass,
        afterAddClass: afterAddClass,
        beforeAddRead: beforeAddRead,
        beforeAddWrite: beforeAddWrite,
        beforeClearStyles: beforeClearStyles,
        beforeStyles: beforeStyles,
        beforeRemoveClass: beforeRemoveClass,
        beforeAddClass: beforeAddClass,
        onFinish: onFinish,
        clearOnFinish: clearOnFinish,
        progressStart: progressStart,
        progressStep: progressStep,
        progressEnd: progressEnd
    };
};
export { createAnimation as c };
