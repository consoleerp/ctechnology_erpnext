## Control Technology ERPNext

ERPNext Customization for Control Technology

#### License

MIT

# Customizations made for Control Technology


## Item
   Cost is shown in Item Dashboard. Best example of showing custom data anywhere you want.  
   Uses `format_currency` to get proper symbols.

## Customer
- **consoleerp_is_pos**  
   A check field to specify the customer is paid always or not.  
   used in Sales Invoice using
   `frm.add_fetch('customer', 'consoleerp_is_pos', 'is_pos');`
   
## Sales Person  
- **Territory** Links Territory - `consoleerp_territory`  
   To filter Sales Teams based on territory

## Sales Invoice
- **Bulk Submit**  
   In Sales Invoice List- a new button is added into Menu. Select all the invoices and click on `Bulk Submit` to submit everything

- **add_fetches**  
   - `is_pos`  
      This is fetched from the customer (`customer`)
	  
- **`consoleerp_has_qty`**  
   `item_code` in `Sales Invoice Item`  
   HAS_QTY - if checked, it will list only those items with qty

- **Mode of Payment / Territory**  
   The mode of payment table is cleared and set if the territory is changed
   Cash Riyadh, Cash Dammam.. etc.
   
- **consoleerp_profit**  
   Profit of the total invoice. Updated when items_add, items_remove, item_code, qty, rate is changed, after a delay of 1000ms
   
- **Sales Team**  
   Filters Sales Team based on `consoleerp_territory`.
   
**Sales Invoice Item**  
- **consoleerp_cost**, **consoleerp_actual_qty**    
   Fetched from `consoleerp_erpnext_client.api.item.item_warehouse_info`
   
## Quotation

**Quotation Item**
- **consoleerp_item_total_qty**  
   Total number of warehouses present for the particular item everywhere.
   Calls `consoleerp_erpnext_client.api.stock_item.item_warehouse_info` with just item as the args
   Iterates the returning dict and calculates the sum of `actualy_qty - reserved_qty - reserved_qty_for_production`. 
   Puts the value in using `frappe.model.set_value(cdt, cdn, field, value);`
   
- **consoleerp_item_availability** 
   A text field showing availability of items
      - If `item_total_qty` > `doc.qty` --> Available
	  - If its less than doc.qty --> 3 Available. 7 more needed.
	  - If `total_qty` == 0 --> Not Available
   **This references the custom field `consoleerp_item_total_qty`**
   
- **consoleerp_notes**  
   Just a `small_text` field in the header of Quotation, used to write small notes.

## Purchase Invoice

- The rate is always zero if there is no previous document   

## Stock Reconciliation

- Renamed to Count Transaction (as in Shamil)
- Moved warehouse to header `consoleerp_warehouse`.
