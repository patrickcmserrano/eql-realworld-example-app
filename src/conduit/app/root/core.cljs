(ns conduit.app.root.core
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr :refer [defrouter]]
            [com.fulcrologic.fulcro.dom :as dom]

            [conduit.app.pages.profile :refer [Profile]]
            [conduit.app.pages.profile-favorites :refer [ProfileFavorites]]
            [conduit.app.pages.settings :refer [Settings]]
            [conduit.app.pages.new-post :refer [NewPost]]
            [conduit.app.pages.sign-up :refer [SignUp]]
            [conduit.app.pages.sign-in :refer [SignIn]]
            [conduit.app.pages.home :refer [Home]]
            [conduit.app.pages.article :refer [Article]]
            [conduit.app.root.components :refer [Header ui-header
                                                 Footer ui-footer]]))



(defrouter TopRouter [this {:keys [current-state]}]
  {:router-targets [Home SignIn ProfileFavorites SignUp Article NewPost Settings Profile]}
  (case current-state
    :pending (dom/div "Loading...")
    :failed (dom/div "Loading seems to have failed. Try another route.")
    (dom/div "Unknown route")))
(def ui-top-router (comp/factory TopRouter))

(defsc Root [this {:>/keys [footer header router]}]
  {:query         [{:>/header (comp/get-query Header)}
                   {:>/router (comp/get-query TopRouter)}
                   {:>/footer (comp/get-query Footer)}]
   :initial-state (fn [_]
                    {:>/header (comp/get-initial-state Header _)
                     :>/router (comp/get-initial-state TopRouter _)
                     :>/footer (comp/get-initial-state Footer _)})}
  (comp/fragment
    (ui-header header)
    (ui-top-router router)
    (ui-footer footer)))

