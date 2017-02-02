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
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}

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

fixtures = [
	{"dt" : "Custom Field", "filters" : [["name", "in", ['Mode of Payment-consoleerp_territory', 'Sales Invoice Item-consoleerp_cost', 'Sales Invoice-consoleerp_hasqty']]]}, 
	
	"Custom Script", 
	
	{"dt" : "Print Format", "filters" : [["name", "in", ['Control Technology Sales Invoice']]]}, 
	
	
	{"dt" : "Property Setter", "filters" : [["name", "in", ['Sales Invoice-default_print_format', 'Sales Invoice-update_stock-hidden', 'Sales Invoice-update_stock-read_only', 'Sales Invoice-update_stock-default', 'Sales Invoice-time_sheet_list-hidden', 'Sales Invoice-terms_section_break-hidden', 'Sales Invoice-recurring_invoice-hidden', 'Sales Invoice-more_information-hidden', 'Sales Invoice-edit_printing_settings-hidden', 'Sales Invoice-column_break4-hidden', 'Sales Invoice-section_break_88-hidden', 'Sales Invoice-currency_and_price_list-hidden', 'Sales Invoice-address_and_contact-hidden', 'Sales Invoice-taxes_section-hidden', 'Sales Invoice-project-hidden', 'Sales Invoice-section_break_40-label']]]}]
