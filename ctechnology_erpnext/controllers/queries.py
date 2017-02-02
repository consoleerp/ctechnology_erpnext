from __future__ import unicode_literals
import frappe
from frappe.desk.reportview import get_match_cond, get_filters_cond
from frappe.utils import nowdate

def hasqty_item_query(doctype, txt, searchfield, start, page_len, filters, as_dict=False):
	conditions = []
	warehouse = filters["warehouse"]
	# deleting to prevent get_filters_cond & get_match_cond
	del filters["warehouse"]
	
	return frappe.db.sql("""select tabItem.name, tabItem.item_group, tabItem.image,
		if(length(tabItem.item_name) > 40,
			concat(substr(tabItem.item_name, 1, 40), "..."), item_name) as item_name,
		if(length(tabItem.description) > 40, \
			concat(substr(tabItem.description, 1, 40), "..."), description) as decription
		from tabItem
			JOIN tabBin 
			ON tabBin.item_code = tabItem.name
		where
			tabBin.actual_qty > 0
			and tabBin.warehouse = %(warehouse)s
			and tabItem.docstatus < 2
			and tabItem.has_variants=0
			and tabItem.disabled=0
			and (tabItem.end_of_life > %(today)s or ifnull(tabItem.end_of_life, '0000-00-00')='0000-00-00')
			and (tabItem.`{key}` LIKE %(txt)s
				or tabItem.item_group LIKE %(txt)s
				or tabItem.item_name LIKE %(txt)s
				or tabItem.description LIKE %(txt)s)
			{fcond} {mcond}
		order by
			if(locate(%(_txt)s, tabItem.name), locate(%(_txt)s, tabItem.name), 99999),
			if(locate(%(_txt)s, tabItem.item_name), locate(%(_txt)s, tabItem.item_name), 99999),
			tabItem.idx desc,
			tabItem.name, tabItem.item_name
		limit %(start)s, %(page_len)s """.format(key=searchfield,
			fcond=get_filters_cond(doctype, filters, conditions).replace('%', '%%'),
			mcond=get_match_cond(doctype).replace('%', '%%')),
			{
				"today": nowdate(),
				"txt": "%%%s%%" % txt,
				"_txt": txt.replace("%", ""),
				"start": start,
				"page_len": page_len,
				"warehouse" : warehouse
			}, as_dict=as_dict)