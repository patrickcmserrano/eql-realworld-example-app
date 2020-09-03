(ns conduit.app.root.components
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr :refer [defrouter]]
            [com.fulcrologic.fulcro.dom :as dom]
            [conduit.app.root.utils :refer [push!]]))


(defsc Header [this {:conduit.redirect/keys [path]
                     ::keys                 [top-routes]}]
       {:query [::dr/current-route
                ::top-routes
                :conduit.redirect/path]
        :ident (fn []
                 [::dr/id ::TopRouter])}
       (let [current-route (dr/current-route this)]
         (dom/nav
           {:className "navbar navbar-light"}
           (dom/div
             {:className "container"}
             (dom/a {:className "navbar-brand"
                     :href      "#/home"}
                    "conduit")
             (when path
               (dom/button
                 {:onClick #(push! this path)}
                 (str "Redirect: '" path "'")))
             (dom/ul
               {:className "nav navbar-nav pull-xs-right"}
               (for [{::keys [label icon img path]} top-routes]
                 (dom/li
                   {:key       label
                    :className "nav-item"}
                   (dom/a
                     {:href    path
                      :classes ["nav-link" (when (= current-route path)
                                             "active")]}
                     (when icon
                       (dom/i {:className icon}))
                     (when img
                       (dom/img {:className "user-pic"
                                 :src       img}))
                     label))))))))
(def ui-header (comp/factory Header))

(defsc Footer [this {::keys []}]
       {:query []}
       (dom/footer
         (dom/div
           {:className "container"}
           (dom/a {:className "logo-font"
                   :href      "#/home"}
                  "conduit")
           (dom/span
             {:className "attribution"}
             "An interactive learning project from "
             (dom/a {:href "https://thinkster.io"} "Thinkster")
             ". Code & design licensed under MIT."))
         ;TODO VERSION VEM DO FP/SHARED
         #_(dom/div
             {:className "container"}
             (dom/code
               (str "v: " VERSION)))))
(def ui-footer (comp/factory Footer))
