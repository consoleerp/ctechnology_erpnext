import frappe

@frappe.whitelist()
def item_warehouse_valuationrate(item, warehouse=None):
	if not warehouse:
		return frappe.db.sql("select warehouse, valuation_rate from tabBin where item_code = '"+ item +"';", as_dict=True)
	else:
		return frappe.db.sql("select valuation_rate, actual_qty from tabBin where item_code = '"+ item +"' and warehouse = '"+warehouse+"';", as_dict=True)