## Control Technology ERPNext

ERPNext Customization for Control Technology

#### License

MIT

# Customizations made for Control Technology

## Quotation

**Quotation Item**
- consoleerp_item_total_qty  
   Total number of warehouses present for the particular item everywhere.
   Calls `consoleerp_erpnext_client.api.stock_item.item_warehouse_info` with just item as the args
   Iterates the returning dict and calculates the sum of `actualy_qty - reserved_qty - reserved_qty_for_production`. 
   Puts the value in using `frappe.model.set_value(cdt, cdn, field, value);`