(function () {
  var extendClass = (function (enhancer, enhancement, enhancerKey) {
    "use strict";

    function bindEventTo(detachEvent, _detachEvent, attachEvent) {
      isElementHit.addMethod(
        _detachEvent,
        attachEvent,
        detachEvent.unbindEvent
      );
      isElementHit.addMethod(
        _detachEvent,
        attachEvent,
        detachEvent.unbindEventWithSelectorOrCallback
      );
      isElementHit.addMethod(
        _detachEvent,
        attachEvent,
        detachEvent.unbindEventWithSelectorAndCallback
      );
    }
    function EventHandlerB(arriveEventB) {
      arriveEventB.arrive = DOMObserver.bindEvent;
      bindEventTo(DOMObserver, arriveEventB, "unbindArrive");
      arriveEventB.leave = subtreeChildM.bindEvent;
      bindEventTo(subtreeChildM, arriveEventB, "unbindLeave");
    }
    if (enhancer.MutationObserver && typeof HTMLElement != "undefined") {
      var placeholder = 0;
      var isElementHit = (function () {
        var matchesCSS =
          HTMLElement.prototype.matches ||
          HTMLElement.prototype.webkitMatchesSelector ||
          HTMLElement.prototype.mozMatchesSelector ||
          HTMLElement.prototype.msMatchesSelector;
        return {
          matchesSelector(styleMatcher, selector) {
            return (
              styleMatcher instanceof HTMLElement &&
              matchesCSS.call(styleMatcher, selector)
            );
          },
          addMethod(bindFunction, config, argumentCheck) {
            var originalFn = bindFunction[config];
            bindFunction[config] = function () {
              if (argumentCheck.length == arguments.length) {
                return argumentCheck.apply(this, arguments);
              } else if (typeof originalFn == "function") {
                return originalFn.apply(this, arguments);
              } else {
                return enhancerKey;
              }
            };
          },
          callCallbacks(callbackQueue, eventListener) {
            if (
              eventListener &&
              eventListener.options.onceOnly &&
              eventListener.firedElems.length == 1
            ) {
              callbackQueue = [callbackQueue[0]];
            }
            for (
              var _callbackQueue, callbackIter = 0;
              (_callbackQueue = callbackQueue[callbackIter]);
              callbackIter++
            ) {
              if (_callbackQueue && _callbackQueue.callback) {
                _callbackQueue.callback.call(
                  _callbackQueue.elem,
                  _callbackQueue.elem
                );
              }
            }
            if (
              eventListener &&
              eventListener.options.onceOnly &&
              eventListener.firedElems.length == 1
            ) {
              eventListener.me.unbindEventWithSelectorAndCallback.call(
                eventListener.target,
                eventListener.selector,
                eventListener.callback
              );
            }
          },
          checkChildNodesRecursively(
            childrenList,
            recursiveNode,
            updateChildTx,
            uniqueId
          ) {
            for (
              var index, childIndex = 0;
              (index = childrenList[childIndex]);
              childIndex++
            ) {
              if (updateChildTx(index, recursiveNode, uniqueId)) {
                uniqueId.push({
                  callback: recursiveNode.callback,
                  elem: index,
                });
              }
              if (index.childNodes.length > 0) {
                isElementHit.checkChildNodesRecursively(
                  index.childNodes,
                  recursiveNode,
                  updateChildTx,
                  uniqueId
                );
              }
            }
          },
          mergeArrays(firstArray, secondArray) {
            var tempIndex;
            var emptyArray = {};
            for (tempIndex in firstArray) {
              if (firstArray.hasOwnProperty(tempIndex)) {
                emptyArray[tempIndex] = firstArray[tempIndex];
              }
            }
            for (tempIndex in secondArray) {
              if (secondArray.hasOwnProperty(tempIndex)) {
                emptyArray[tempIndex] = secondArray[tempIndex];
              }
            }
            return emptyArray;
          },
          toElementsArray(ensureDataStr) {
            if (
              enhancerKey !== ensureDataStr &&
              (typeof ensureDataStr.length != "number" ||
                ensureDataStr === enhancer)
            ) {
              ensureDataStr = [ensureDataStr];
            }
            return ensureDataStr;
          },
        };
      })();
      var domEventRef = (function () {
        class eventTracker {
          constructor() {
            this._eventsBucket = [];
            this._beforeAdding = null;
            this._beforeRemoving = null;
          }
          addEvent(domEventDataS, eventManager, trackingEvent, dataObjectRef) {
            var eventDetail = {
              target: domEventDataS,
              selector: eventManager,
              options: trackingEvent,
              callback: dataObjectRef,
              firedElems: [],
            };
            if (this._beforeAdding) {
              this._beforeAdding(eventDetail);
            }
            this._eventsBucket.push(eventDetail);
            return eventDetail;
          }
          removeEvent(addElementFxL) {
            for (
              var currentEvent, endToStartInd = this._eventsBucket.length - 1;
              (currentEvent = this._eventsBucket[endToStartInd]);
              endToStartInd--
            ) {
              if (addElementFxL(currentEvent)) {
                if (this._beforeRemoving) {
                  this._beforeRemoving(currentEvent);
                }
                var _eventListener = this._eventsBucket.splice(
                  endToStartInd,
                  1
                );
                if (_eventListener && _eventListener.length) {
                  _eventListener[0].callback = null;
                }
              }
            }
          }
          beforeAdding(eventHandler) {
            this._beforeAdding = eventHandler;
          }
          beforeRemoving(lastEvent) {
            this._beforeRemoving = lastEvent;
          }
        }
        return eventTracker;
      })();
      class createEvent {
        constructor(cleanFirstOfE, _eventHandler) {
          var _domEventRef = new domEventRef();
          var self = this;
          var shouldFireOnD = {
            fireOnAttributesModification: false,
          };
          _domEventRef.beforeAdding(function (preEventHandl) {
            var undefined;
            var eventTarget = preEventHandl.target;
            if (eventTarget === enhancer.document || eventTarget === enhancer) {
              eventTarget = document.getElementsByTagName("html")[0];
            }
            undefined = new MutationObserver(function (eventPreventF) {
              _eventHandler.call(this, eventPreventF, preEventHandl);
            });
            var placeholderFn = cleanFirstOfE(preEventHandl.options);
            undefined.observe(eventTarget, placeholderFn);
            preEventHandl.observer = undefined;
            preEventHandl.me = self;
          });
          _domEventRef.beforeRemoving(function (_uniqueId) {
            _uniqueId.observer.disconnect();
          });
          this.bindEvent = function (
            DOMNodeMutate,
            mutationObser,
            observerCrea
          ) {
            mutationObser = isElementHit.mergeArrays(
              shouldFireOnD,
              mutationObser
            );
            for (
              var affectedByImp = isElementHit.toElementsArray(this),
                hitCounter = 0;
              hitCounter < affectedByImp.length;
              hitCounter++
            ) {
              _domEventRef.addEvent(
                affectedByImp[hitCounter],
                DOMNodeMutate,
                mutationObser,
                observerCrea
              );
            }
          };
          this.unbindEvent = function () {
            var eventListenEO = isElementHit.toElementsArray(this);
            _domEventRef.removeEvent(function (domNodeMutate) {
              for (
                var __eventListener = 0;
                __eventListener < eventListenEO.length;
                __eventListener++
              ) {
                if (
                  this === enhancerKey ||
                  domNodeMutate.target === eventListenEO[__eventListener]
                ) {
                  return true;
                }
              }
              return false;
            });
          };
          this.unbindEventWithSelectorOrCallback = function (mutationList) {
            var hasInteracted;
            var interactedEle = isElementHit.toElementsArray(this);
            var _mutationList = mutationList;
            if (typeof mutationList == "function") {
              hasInteracted = function (domEventEnhan) {
                for (
                  var _interactedEle = 0;
                  _interactedEle < interactedEle.length;
                  _interactedEle++
                ) {
                  if (
                    (this === enhancerKey ||
                      domEventEnhan.target === interactedEle[_interactedEle]) &&
                    domEventEnhan.callback === _mutationList
                  ) {
                    return true;
                  }
                }
                return false;
              };
            } else {
              hasInteracted = function (eventUnbindId) {
                for (
                  var enhancerKeyMg = 0;
                  enhancerKeyMg < interactedEle.length;
                  enhancerKeyMg++
                ) {
                  if (
                    (this === enhancerKey ||
                      eventUnbindId.target === interactedEle[enhancerKeyMg]) &&
                    eventUnbindId.selector === mutationList
                  ) {
                    return true;
                  }
                }
                return false;
              };
            }
            _domEventRef.removeEvent(hasInteracted);
          };
          this.unbindEventWithSelectorAndCallback = function (
            interactionMs,
            onMutationDet
          ) {
            var interactionSc = isElementHit.toElementsArray(this);
            _domEventRef.removeEvent(function (___eventListener) {
              for (
                var _interactionSc = 0;
                _interactionSc < interactionSc.length;
                _interactionSc++
              ) {
                if (
                  (this === enhancerKey ||
                    ___eventListener.target ===
                      interactionSc[_interactionSc]) &&
                  ___eventListener.selector === interactionMs &&
                  ___eventListener.callback === onMutationDet
                ) {
                  return true;
                }
              }
              return false;
            });
          };
          return this;
        }
      }
      function _mutationObser() {
        function monitorAndAnn(____eventListener) {
          var elementMonit = {
            attributes: false,
            childList: true,
            subtree: true,
          };
          if (____eventListener.fireOnAttributesModification) {
            elementMonit.attributes = true;
          }
          return elementMonit;
        }
        function collectEventN(dynamicEventH, _____eventListener) {
          dynamicEventH.forEach(function (uniqueEventId) {
            var connectedDomE = uniqueEventId.addedNodes;
            var _uniqueEventId = uniqueEventId.target;
            var _connectedDomE = [];
            if (connectedDomE !== null && connectedDomE.length > 0) {
              isElementHit.checkChildNodesRecursively(
                connectedDomE,
                _____eventListener,
                elementMatchC,
                _connectedDomE
              );
            } else if (
              uniqueEventId.type === "attributes" &&
              elementMatchC(_uniqueEventId, _____eventListener, _connectedDomE)
            ) {
              _connectedDomE.push({
                callback: _____eventListener.callback,
                elem: _uniqueEventId,
              });
            }
            isElementHit.callCallbacks(_connectedDomE, _____eventListener);
          });
        }
        function elementMatchC(eventUpdater, _eventTracker) {
          if (
            isElementHit.matchesSelector(
              eventUpdater,
              _eventTracker.selector
            ) &&
            (eventUpdater._id === enhancerKey &&
              (eventUpdater._id = placeholder++),
            _eventTracker.firedElems.indexOf(eventUpdater._id) == -1)
          ) {
            _eventTracker.firedElems.push(eventUpdater._id);
            return true;
          } else {
            return false;
          }
        }
        var ______eventListener = {
          fireOnAttributesModification: false,
          onceOnly: false,
          existing: false,
        };
        DOMObserver = new createEvent(monitorAndAnn, collectEventN);
        var elementObserv = DOMObserver.bindEvent;
        DOMObserver.bindEvent = function (
          _______eventListener,
          listenerMap,
          matchAndAttnE
        ) {
          if (enhancerKey === matchAndAttnE) {
            matchAndAttnE = listenerMap;
            listenerMap = ______eventListener;
          } else {
            listenerMap = isElementHit.mergeArrays(
              ______eventListener,
              listenerMap
            );
          }
          var enhancerKeySw = isElementHit.toElementsArray(this);
          if (listenerMap.existing) {
            var _emptyArray = [];
            for (
              var enhancerIndex = 0;
              enhancerIndex < enhancerKeySw.length;
              enhancerIndex++
            ) {
              for (
                var _enhancerKeySw =
                    enhancerKeySw[enhancerIndex].querySelectorAll(
                      _______eventListener
                    ),
                  __enhancerKeySw = 0;
                __enhancerKeySw < _enhancerKeySw.length;
                __enhancerKeySw++
              ) {
                _emptyArray.push({
                  callback: matchAndAttnE,
                  elem: _enhancerKeySw[__enhancerKeySw],
                });
              }
            }
            if (listenerMap.onceOnly && _emptyArray.length) {
              return matchAndAttnE.call(
                _emptyArray[0].elem,
                _emptyArray[0].elem
              );
            }
            setTimeout(isElementHit.callCallbacks, 1, _emptyArray);
          }
          elementObserv.call(
            this,
            _______eventListener,
            listenerMap,
            matchAndAttnE
          );
        };
        return DOMObserver;
      }
      function updateDOMOnSv() {
        function getMutationOb() {
          var __mutationObser = {
            childList: true,
            subtree: true,
          };
          return __mutationObser;
        }
        function collectAndRem(elementHitDet, ________eventListener) {
          elementHitDet.forEach(function (elementEventL) {
            var removedNodes = elementEventL.removedNodes;
            var filteredList = [];
            if (removedNodes !== null && removedNodes.length > 0) {
              isElementHit.checkChildNodesRecursively(
                removedNodes,
                ________eventListener,
                matches,
                filteredList
              );
            }
            isElementHit.callCallbacks(filteredList, ________eventListener);
          });
        }
        function matches(EventListener, _enhancerKey) {
          return isElementHit.matchesSelector(
            EventListener,
            _enhancerKey.selector
          );
        }
        var ___mutationObser = {};
        subtreeChildM = new createEvent(getMutationOb, collectAndRem);
        var ____mutationObser = subtreeChildM.bindEvent;
        subtreeChildM.bindEvent = function (
          _________eventListener,
          deferredExec,
          deferred
        ) {
          if (enhancerKey === deferred) {
            deferred = deferredExec;
            deferredExec = ___mutationObser;
          } else {
            deferredExec = isElementHit.mergeArrays(
              ___mutationObser,
              deferredExec
            );
          }
          ____mutationObser.call(
            this,
            _________eventListener,
            deferredExec,
            deferred
          );
        };
        return subtreeChildM;
      }
      var DOMObserver = new _mutationObser();
      var subtreeChildM = new updateDOMOnSv();
      if (enhancement) {
        EventHandlerB(enhancement.fn);
      }
      EventHandlerB(HTMLElement.prototype);
      EventHandlerB(NodeList.prototype);
      EventHandlerB(HTMLCollection.prototype);
      EventHandlerB(HTMLDocument.prototype);
      EventHandlerB(Window.prototype);
      var unusedLocal = {};
      bindEventTo(DOMObserver, unusedLocal, "unbindAllArrive");
      bindEventTo(subtreeChildM, unusedLocal, "unbindAllLeave");
      return unusedLocal;
    }
  })(window, typeof jQuery == "undefined" ? null : jQuery, undefined);
  document.arrive("iframe", function (_filterEventOw) {
    frameUrlCheck();
  });
  function frameUrlCheck() {
    document.querySelectorAll("iframe").forEach((tweetgoSrc) => {
      let srcUrl = tweetgoSrc.getAttribute("src");
      if (srcUrl && srcUrl.includes("tgWebAppPlatform=web")) {
        srcUrl = srcUrl.replace(
          /tgWebAppPlatform=web[a-z]*/g,
          "tgWebAppPlatform=ios"
        );
        tweetgoSrc.setAttribute("src", srcUrl);
      }
    });
  }
  frameUrlCheck();
  console.log("Script content loaded");
  chrome.runtime.onMessage.addListener(function (
    undefinedVar,
    _eventHandlerP,
    applyMutation
  ) {
    console.log("Received message content in script:", undefinedVar);
    if (undefinedVar.action === "getSessionStorage") {
      const sessionData = JSON.stringify(sessionStorage);
      applyMutation({
        data: sessionData,
      });
    }
  });
})();
