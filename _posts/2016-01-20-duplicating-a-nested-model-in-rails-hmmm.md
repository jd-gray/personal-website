---
layout: post
title: Duplicating a nested model in Rails, huh?
---

So today I worked on something that I never expected to do within a Rails application, I duplicated a nested model to fit a particular problem. To give a bit of reference without going too deep, the application I am working on allows users to create construction bids. Users go within their settings to import products and during the bid creation, those products can be added, edited, or deleted at any time. Every time a product is added to a bid, a bid_product is created. A product also contains product_variants which are nested within each product, if applicable (product variant ex. The coping of a pool is considered a product and brick coping or flagstone coping would be variants) . Simple enough, right?

So what's the problem? There were user cases in which if a user changes a product from the settings page, we do not want this change to waterfall throughout the application. Each bid_product and bid_product_variant needs to be unique to the bid and not change. Thus some additional tables would have to be created.

It was simple enough to copy over certain properties from our product model to our bid_product model. But now we have to account for the creation of variants. Heres some of what I did to accomplish:

```ruby
# Lets create our table

  create_table "bid_product_variants", force: :cascade do |t|
    t.string   "name"
    t.integer  "price_cents"
    t.text     "description"
    t.integer  "cost_cents"
    t.integer  "bid_product_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end
```

Now lets take a look at the model:

```ruby
# bid_product.rb

# Setup our association
has_many :bid_product_variants, dependent: :destroy

# Create our callback to create bid_product_variants within a 
# bid_product (bid_product needs to be created first)
after_create :inherit_attributes_from_product_variants

private

    def inherit_attributes_from_product_variants
      if product.variants.present?
        # Loop through and create bid_product_variants accordingly
        product.variants.each do |p|
          self.bid_product_variants.create(name: p.name, price_cents: p.price_cents,
            cost_cents: p.cost_cents, uom_field_id: p.uom_field_id, 
           description: p.description, product_variant_id: p.id)
        end
      end
    end
```

For reference, within these new bid_product_variants there is the ability to edit uniquely. Although this scenario might not make the most sense or even be utilized in applications, I thought it would be a good learning experience to share in the event anyone would want to duplicate certain attributes into another table.
