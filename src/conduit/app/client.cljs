(ns conduit.app.client
  (:require
    [clojure.core.async :as async]
    [clojure.string :as string]
    [conduit.register :as register]
    [com.fulcrologic.fulcro.algorithms.tx-processing :as ftx]
    [com.fulcrologic.fulcro.application :as app]
    [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
    [com.fulcrologic.fulcro.data-fetch :as df]
    [com.fulcrologic.fulcro.dom :as dom]
    [com.fulcrologic.fulcro.mutations :as m]
    [com.fulcrologic.fulcro.routing.dynamic-routing :as dr :refer [defrouter]]
    [com.wsscode.pathom.connect :as pc]
    [com.wsscode.pathom.core :as p]
    [conduit.ui :as ui]
    [edn-query-language.core :as eql]
    [goog.events :as events]
    [goog.history.EventType :as et]
    [conduit.app.root.core :refer [Root]]
    [conduit.app.root.components :refer [Header]])
  (:import (goog.history Html5History)))
;; TODO: Create a lib for "pathom remote"

(goog-define VERSION "develop")
(defn transmit!
  [{:keys [parser]
    :as   env} {::ftx/keys [; id idx options update-handler active?
                            result-handler ast]}]
  (let [query (eql/ast->query ast)
        result (parser env query)]
    (async/go
      (result-handler {:body                 (async/<! result)
                       :original-transaction ast
                       :status-code          200}))))

(defn client-did-mount
  "Must be used as :client-did-mount parameter of app creation, or called just after you mount the app."
  [app]
  (let [{::keys [history]} (comp/shared app)]
    (doto history
      (events/listen et/NAVIGATE (fn [^goog.history.Event e]
                                   (let [token (.-token e)
                                         path (vec (rest (string/split (first (string/split token #"\?"))
                                                                       #"/")))]
                                     (dr/change-route! app path)
                                     (df/load! app :>/header Header))))
      (.setEnabled true))))

(def parser
  (p/parallel-parser
    {::p/plugins [(pc/connect-plugin {::pc/register (concat register/register
                                                            [pc/index-explorer-resolver])})
                  p/elide-special-outputs-plugin]
     ::p/mutate  pc/mutate-async}))

(def remote
  {:transmit!               transmit!
   :parser                  parser
   ::jwt                    (reify
                              IDeref (-deref [this] (.getItem js/localStorage "jwt"))
                              IReset (-reset! [this value] (.setItem js/localStorage "jwt" value)
                                       value))
   ::api-url                "https://conduit.productionready.io/api"
   ::p/reader               [p/map-reader
                             pc/parallel-reader
                             pc/open-ident-reader
                             p/env-placeholder-reader]
   ::p/placeholder-prefixes #{">"}})

(defonce app
         (delay (app/fulcro-app {:client-did-mount client-did-mount
                                 :shared           {::history (Html5History.)
                                                    ::version VERSION}
                                 :remotes          {:remote remote}})))

(defn ^:export main
  [node]
  (app/mount! @app Root node))
