(ns conduit.app.pages.sign-up
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [conduit.ui :as ui]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [com.fulcrologic.fulcro.dom :as dom]
            [com.fulcrologic.fulcro.mutations :as m]
            [conduit.app.root.components :refer [Header]]))

(defsc SignUp [this {::keys [waiting? errors]}]
  {:ident         (fn [] [::session ::my-profile])
   :query         [::waiting?
                   {::errors (comp/get-query ui/ErrorMessage)}]
   :will-enter    (fn [app _]
                    (dr/route-deferred [::session ::my-profile]
                                       #(df/load! app [::session ::my-profile] SignUp
                                                  {:post-mutation        `dr/target-ready
                                                   :post-mutation-params {:target [::session ::my-profile]}})))
   :route-segment ["register"]}
  (dom/div
    {:className "auth-page"}
    (dom/div
      {:className "container page"}
      (dom/div
        {:className "row"}
        (dom/div
          {:className "col-md-6 offset-md-3 col-xs-12"}
          (dom/h1
            {:className "text-xs-center"}
            "Sign up")
          (dom/p
            {:className "text-xs-center"}
            (dom/a
              {:href "#/login"}
              "Have an account?"))
          (dom/ul
            {:className "error-messages"}
            (for [error errors
                  :let [on-remove (fn []
                                    (m/set-value! this
                                                  ::errors (remove #{error} errors)))]]
              (ui/ui-error-message (comp/computed error
                                                  {::ui/on-remove on-remove}))))
          (ui/form
            {::ui/on-submit    (when-not waiting?
                                 (fn [params]
                                   (comp/transact! this `[(conduit.profile/register ~params)])))
             ::ui/attributes   [:conduit.profile/username
                                :conduit.profile/email
                                :conduit.profile/password]
             ::ui/labels       {:conduit.profile/username "Your Name"
                                :conduit.profile/email    "Email"
                                :conduit.profile/password "Password"}
             ::ui/large        #{:conduit.profile/email
                                 :conduit.profile/username
                                 :conduit.profile/password}
             ::ui/submit-label (if waiting?
                                 "Signing up ..."
                                 "Sign up")
             ::ui/types        {:conduit.profile/password "password"}}))))))


(defsc AuthReturn [_ _]
  {:query [{:>/header (comp/get-query Header)}
           {:>/sign-up (comp/get-query SignUp)}]})

(m/defmutation conduit.profile/register
  [{:conduit.profile/keys [email password]}]
  (action [{:keys [ref state] :as env}]
          (swap! state (fn [st]
                         (-> st
                             (update-in ref assoc
                                        ::errors []
                                        ::waiting? true)))))
  (remote [env]
          (-> env
              (m/returning AuthReturn))))
