$.extend(frappe.listview_settings['Sales Invoice'], {
	onload: function(listview) {
		listview.page.add_menu_item(__("Bulk Submit"), function() {
			console.log(getIdsFromList());
			frappe.call({
				method: "ctechnology_erpnext.customizations.sales_invoice.submit_invoices",
				args: {
					invoices: getIdsFromList()
				}
			});
			console.log(listview.page);
		});
	}
});

var getIdsFromList = function(){
	var docids = null;
	var route = frappe.get_route();
	var len = route.length;
	if (len > 1 && route[0] === "List"){
		var doctype = route[1];
		var page = [route[0], doctype].join("/");
		docids = getCheckedNames(page);
	}

	return docids;
};

getChecked = function(name){
	return $(frappe.pages[name]).find("input:checked");
};

getCheckedNames = function(page){
	var names = [];
	var checked = getChecked(page);
	var elems_a = checked.siblings("a");
	elems_a.each(function(i,el){
		var t = unescape($(el).attr("href")).slice(1);
		var s = t.split("/");
		names.push(s[s.length - 1]);
	});

	return names;
};