(ns conduit.dev
  (:require [com.fulcrologic.fulcro.inspect.preload]
            [devtools.preload]
            [conduit.app.client :as client]
            [com.fulcrologic.fulcro.application :as app]))

(defn after-load
  []
  (app/force-root-render! @client/app))
