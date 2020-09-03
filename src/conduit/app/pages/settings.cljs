(ns conduit.app.pages.settings
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [conduit.ui :as ui]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [com.fulcrologic.fulcro.dom :as dom]))

(defsc Settings [this props]
  {:ident         (fn [] [::session ::my-profile])
   :query         [:conduit.profile/bio
                   :conduit.profile/username
                   :conduit.profile/email
                   :conduit.profile/image]
   :route-segment ["settings"]
   :will-enter    (fn [app _]
                    (dr/route-deferred [::session ::my-profile]
                                       #(df/load! app ::my-profile Settings
                                                  {:post-mutation        `dr/target-ready
                                                   :post-mutation-params {:target [::session ::my-profile]}})))}
  (dom/div
    :.settings-page
    (dom/div
      :.container.page
      (dom/div
        :.row
        (dom/div
          :.col-md-6.offset-md-3.col-xs-12
          (dom/h1 :.text-xs-center
                  "Your Settings")
          (ui/form
            {::ui/default-values props
             ::ui/on-submit      (fn [props]
                                   (prn props))
             ::ui/large          #{:conduit.profile/username
                                   :conduit.profile/email
                                   :conduit.profile/bio
                                   :conduit.profile/password}
             ::ui/multiline      #{:conduit.profile/bio}
             ::ui/attributes     [:conduit.profile/image
                                  :conduit.profile/username
                                  :conduit.profile/bio
                                  :conduit.profile/email
                                  :conduit.profile/password]
             ::ui/submit-label   "Update Settings"}))))))
