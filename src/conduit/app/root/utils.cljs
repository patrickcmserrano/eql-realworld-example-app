(ns conduit.app.root.utils
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr :refer [defrouter]])
  (:import (goog.history Html5History)))



(defn push!
  [app path]
  (let [{::keys [^Html5History history]} (comp/shared app)]
    (.setToken history (subs path 1))))
