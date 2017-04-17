# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "ctechnology_erpnext"
app_title = "Control Technology ERPNext"
app_publisher = "ConsoleERP"
app_description = "ERPNext Customization for Control Technology"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@consoleerp.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/ctechnology_erpnext/css/ctechnology_erpnext.css"
# app_include_js = "/assets/ctechnology_erpnext/js/ctechnology_erpnext.js"

# include js, css files in header of web template
# web_include_css = "/assets/ctechnology_erpnext/css/ctechnology_erpnext.css"
# web_include_js = "/assets/ctechnology_erpnext/js/ctechnology_erpnext.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
doctype_list_js = {
	"Sales Invoice": "customizations/sales_invoice/sales_invoice_list.js"
}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
doctype_js = {
	"Item" : "customizations/item/item.js",
	
	# Selling
	"Quotation" : "customizations/quotation/quotation.js",
	"Sales Order" : "customizations/sales_order/sales_order.js",
	"Sales Invoice" : "customizations/sales_invoice/sales_invoice.js",
	"Delivery Note" : "customizations/delivery_note/delivery_note.js",
	
	# Payments
	"Payment Request" : "customizations/payment_request/payment_request.js",
	"Payment Entry" : "customizations/payment_entry/payment_entry.js",
	
	#Stock
	"Stock Entry" : "customizations/stock_entry/stock_entry.js",
	"Warehouse Transfer": "customizations/warehouse_transfer/warehouse_transfer.js",
	
	# Buying
	"Material Request" : "customizations/material_request/material_request.js",
	"Request for Quotation" : "customizations/request_for_quotation/request_for_quotation.js",
	"Supplier Quotation" : "customizations/supplier_quotation/supplier_quotation.js",
	"Purchase Order" : "customizations/purchase_order/purchase_order.js",
	"Purchase Receipt" : "customizations/purchase_receipt/purchase_receipt.js",
	"Purchase Invoice" : "customizations/purchase_invoice/purchase_invoice.js",
	
}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "ctechnology_erpnext.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "ctechnology_erpnext.install.before_install"
# after_install = "ctechnology_erpnext.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "ctechnology_erpnext.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"ctechnology_erpnext.tasks.all"
# 	],
# 	"daily": [
# 		"ctechnology_erpnext.tasks.daily"
# 	],
# 	"hourly": [
# 		"ctechnology_erpnext.tasks.hourly"
# 	],
# 	"weekly": [
# 		"ctechnology_erpnext.tasks.weekly"
# 	]
# 	"monthly": [
# 		"ctechnology_erpnext.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "ctechnology_erpnext.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "ctechnology_erpnext.event.get_events"
# }

fixtures = [{
        "dt": "Custom Field",
        "filters": [
            ["name", "in", [
			
				# Customer
				'Customer-consoleerp_is_pos', # Sales Invoice add_fetch to Is POS
				# Mode of Payment
				'Mode of Payment-consoleerp_territory',				
				# Sales Person
				'Sales Person-consoleerp_territory',
				
				# Sales Invoice Fields                
                'Sales Invoice-consoleerp_hasqty', # Has Qty check field
				'Sales Invoice-consoleerp_sales_person',
				'Sales Invoice-consoleerp_profit', # profit field
				'Sales Invoice Item-consoleerp_cost', # Cost
                'Sales Invoice Item-consoleerp_actual_qty', # actual qty
				
				# Quotation
				'Quotation-consoleerp_notes', # a small-text datafield in the header of quotation
				'Quotation Item-consoleerp_item_total_qty', # qty available in all of the warehouses
				'Quotation Item-consoleerp_item_availability' # an editable textfield for availability
            ]]
        ]
    }
]
