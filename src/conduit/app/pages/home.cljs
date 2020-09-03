(ns conduit.app.pages.home
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [conduit.ui :as ui]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [com.fulcrologic.fulcro.dom :as dom]
            [conduit.app.root.utils :refer [push!]]))

(defsc Home [this {::keys [articles
                           feed-toggle
                           popular-tags]}]
  {:query         [{::feed-toggle (comp/get-query ui/FeedButton)}
                   {::articles (comp/get-query ui/ArticlePreview)}
                   {::popular-tags (comp/get-query ui/TagPill)}]
   :ident         (fn []
                    [:component/id ::home])   :route-segment ["home"]
   :will-enter    (fn [app _]
                    (dr/route-deferred [:component/id ::home]
                                       #(df/load! app [:component/id ::home] Home
                                                  {:post-mutation        `dr/target-ready
                                                   :post-mutation-params {:target [:component/id ::home]}})))}
  (dom/div
    {:className "home-page"}
    (ui/banner)
    (dom/div
      {:className "container page"}
      (dom/div
        {:className "row"}
        (dom/div
          {:className "col-md-9"}
          (dom/div
            {:className "feed-toggle"}
            (dom/ul
              {:className "nav nav-pills outline-active"}
              (map ui/ui-feed-button feed-toggle)))
          (for [article articles]
            (ui/ui-article-preview (comp/computed article
                                                  {::ui/on-fav (fn []
                                                                 (push! this "#/login"))}))))
        (dom/div
          {:className "col-md-3"}
          (dom/div
            {:className "sidebar"}
            (dom/p "Popular tags")
            (dom/div
              {:className "tag-list"}
              (map ui/ui-tag-pill popular-tags))))))))
