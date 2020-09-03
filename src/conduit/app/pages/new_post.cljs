(ns conduit.app.pages.new-post
  (:require [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
            [conduit.ui :as ui]
            [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
            [com.fulcrologic.fulcro.data-fetch :as df]
            [com.fulcrologic.fulcro.dom :as dom]))

(defsc NewPost [this props]
  {:ident         (fn []
                    [:component/id ::new-post])
   :query         []
   :route-segment ["editor"]}
  (dom/div
    :.editor-page
    (dom/div
      :.container.page
      (dom/div
        :.row
        (dom/div
          :.col-md-10.offset-md-1.col-xs-12
          (ui/form
            {::ui/attributes   [:conduit.article/title
                                :conduit.article/description
                                :conduit.article/body
                                :conduit.article/tags]
             ::ui/multiline    #{:conduit.article/body}
             ::ui/large        #{:conduit.article/title}
             ::ui/labels       {:conduit.article/title       "Article Title"
                                :conduit.article/description "What's this article about?"
                                :conduit.article/body        "Write your article (in markdown)"
                                :conduit.article/tags        "Enter tags"}
             ::ui/on-submit    (fn [params]
                                 (prn params))
             ::ui/submit-label "Publish Article"}))))))
