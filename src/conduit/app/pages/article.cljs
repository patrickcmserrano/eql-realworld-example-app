(ns conduit.app.pages.article
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [conduit.ui :as ui]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [com.fulcrologic.fulcro.dom :as dom]))

(defsc Article [this {:>/keys               [article-meta]
                      :conduit.article/keys [comments body title]}]
  {:query         [:conduit.article/body
                   {:conduit.article/comments (comp/get-query ui/Comment)}
                   {:>/article-meta (comp/get-query ui/ArticleMeta)}
                   :conduit.article/slug
                   :conduit.article/title]
   :ident         :conduit.article/slug
   :route-segment ["article" :conduit.article/slug]
   :will-enter    (fn [app {:conduit.article/keys [slug]}]
                    (dr/route-deferred [:conduit.article/slug slug]
                                       #(df/load! app [:conduit.article/slug slug] Article
                                                  {:post-mutation        `dr/target-ready
                                                   :post-mutation-params {:target [:conduit.article/slug slug]}})))}
  (dom/div
    :.article-page
    (dom/div
      :.banner
      (dom/div
        :.container
        (dom/h1 title)
        (ui/ui-article-meta article-meta)))
    (dom/div
      :.container.page
      (dom/div
        :.row.article-content
        (dom/section
          {:className "col-md-12"}
          (ui/markdown body)))
      (dom/hr)
      (dom/div
        :.article-actions
        (ui/ui-article-meta article-meta))
      (dom/div
        :.row
        (dom/div
          :.col-xs-12.col-md-8.offset-md-2
          (dom/form
            {:className "card comment-form"}
            (dom/div
              {:className "card-block"}
              (dom/textarea
                {:className   "form-control"
                 :placeholder "Write a comment ..."
                 :rows        3})
              (dom/div
                {:className "card-footer"}
                (dom/img {:src "" #_my-image
                          :alt "my profile image"})
                (dom/button
                  {:className "btn btn-sm btn-primary"}
                  "Post Comment"))))
          (map ui/ui-comment comments))))))
