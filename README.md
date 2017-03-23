## Control Technology ERPNext

ERPNext Customization for Control Technology

#### License

MIT

# Customizations made for Control Technology

## Customer
- **consoleerp_is_pos**  
   A check field to specify the customer is paid always or not.  
   used in Sales Invoice using
   `frm.add_fetch('customer', 'consoleerp_is_pos', 'is_pos');`

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
