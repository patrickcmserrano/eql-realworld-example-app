(ns conduit.app.pages.profile-favorites
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [conduit.ui :as ui]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [com.fulcrologic.fulcro.dom :as dom]
            [conduit.app.root.utils :refer [push!]]))

(defsc ProfileFavorites [this {:>/keys               [user-info]
                               :conduit.profile/keys [favorites-articles me?]}]
  {:query         [:conduit.profile/username
                   :conduit.profile/me?
                   {:>/user-info (comp/get-query ui/UserInfo)}
                   {:conduit.profile/favorites-articles (comp/get-query ui/ArticlePreview)}]
   :ident         :conduit.profile/username
   :route-segment ["profile" :conduit.profile/username "favorites"]
   :will-enter    (fn [app {:conduit.profile/keys [username]}]
                    (dr/route-deferred [:conduit.profile/username username]
                                       #(df/load! app [:conduit.profile/username username] ProfileFavorites
                                                  {:post-mutation        `dr/target-ready
                                                   :post-mutation-params {:target [:conduit.profile/username username]}})))}
  (dom/div
    :.profile-page
    (ui/ui-user-info (comp/computed user-info
                                    (if me?
                                      {::ui/on-edit (fn []
                                                      (push! this "#/settings"))}
                                      {::ui/on-follow (fn []
                                                        (push! this "#/login"))})))
    (dom/div
      :.container
      (dom/div
        :.row
        (dom/div
          :.col-xs-12.col-md-10.offset-md-1
          (dom/div
            :.articles-toggle
            (dom/ul
              :.nav.nav-pills.outline-active
              (dom/li
                :.nav-item
                (dom/a :.nav-link.active {:href "#"} "My Articles"))
              (dom/li
                :.nav-item
                (dom/a :.nav-link {} "Favorited Articles"))))
          (for [article favorites-articles]
            (ui/ui-article-preview (comp/computed article
                                                  {::ui/on-fav (fn [])}))))))))
