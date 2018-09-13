
// polite IIFE wrapper
!function(){
	$(function(){
		// required to have at least one author
		ExternalModuleTemplater.addTab('authors')
		$('#authorsName1').attr('required', true)
	})
}()

// global javascript object for this external module
var ExternalModuleTemplater = {
	elements : {
		tabHead : `<li class="nav-item">
						<a class="nav-link" onclick="ExternalModuleTemplater.setActiveTab('authors', $(this).parent().index()+1)"></a>
					</li>`,
		authorsForm : `<div class="authorsInfo" id="authorsInfo_i_" name="authorsInfo_i_">
				<div class="form-group row">
					<label for="authorsName_i_" class="col-sm-2 col-form-label">Author Name</label>
					<div class="col-sm-10">
						<input type="text" id="authorsName_i_" name="authorsName_i_" class="form-control" placeholder="John A. Smith" required></input>
					</div>
				</div>
				<div class="form-group row">
					<label for="authorsEmail_i_" class="col-sm-2 col-form-label">Email Address</label>
					<div class="col-sm-10">
						<input type="text" id="authorsEmail_i_" name="authorsEmail_i_" class="form-control mb-1" placeholder="john.smith@abc.org"></input>
					</div>
				</div>
				<div class="form-group row">
					<label for="authorsOrg_i_" class="col-sm-2 col-form-label">Organization</label>
					<div class="col-sm-10">
						<input type="text" id="authorsOrg_i_" name="authorsOrg_i_" class="form-control" placeholder="ABC Research"></input>
					</div>
				</div>
			</div>`,
		linksForm : `<div class="linksInfo" id="linksInfo_i_" name="linksInfo_i_">
				<div class="form-group row">
					<label for="linksName_i_" class="col-sm-2 col-form-label">Link Name</label>
					<div class="col-sm-10">
						<input type="text" id="linksName_i_" name="linksName_i_" class="form-control" placeholder="MyModule Config Page"></input>
					</div>
				</div>
				<div class="form-group row">
					<label for="linksUrl_i_" class="col-sm-2 col-form-label">URL</label>
					<div class="col-sm-10">
						<input type="text" id="linksUrl_i_" name="linksUrl_i_" class="form-control mb-1" placeholder="mymodule/config.php"></input>
					</div>
				</div>
				<div class="form-group row">
					<label for="linksIcon_i_" class="col-sm-2 col-form-label">Icon</label>
					<div class="col-sm-10">
						<input type="text" id="linksIcon_i_" name="linksIcon_i_" class="form-control mb-1" placeholder="report"></input>
						<span class="text-muted">The name of an icon in REDCap's image repository</span>
					</div>
				</div>
				<fieldset class="form-group">
					<div class="row">
						<legend class="col-form-label col-sm-2 pt-0">Locations</legend>
						<div class="col-sm-10">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" id="linksProjectCheckbox_i_" name="linksProjectCheckbox_i_">
								<label class="form-check-label" for="linksProjectCheckbox_i_">
								Project
								</label>
							</div>
							<div class="form-check">
								<input class="form-check-input" type="checkbox" id="linksControlCenterCheckbox_i_" name="linksControlCenterCheckbox_i_">
								<label class="form-check-label" for="linksControlCenterCheckbox_i_">
									Control Center
								</label>
							</div>
						</div>
					</div>
				</fieldset>
				<fieldset class="form-group">
					<div class="row">
						<legend class="col-form-label col-sm-2 pt-0">NOAUTH</legend>
						<div class="col-sm-10">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" id="linksNOAUTH_i_" name="linksNOAUTH_i_">
							</div>
						</div>
					</div>
				</fieldset>
			</div>`,
		cronsForm : `<div class="cronsInfo" id="cronsInfo_i_ name="cronsInfo_i_">
				<div class="form-group row">
					<label for="cronsName_i_" class="col-sm-2 col-form-label">Cron Name</label>
					<div class="col-sm-10">
						<input type="text" id="cronsName_i_" name="cronsName_i_" class="form-control" placeholder="myCron"></input>
					</div>
				</div>
				<div class="form-group row">
					<label for="cronsDescription_i_" class="col-sm-2 col-form-label">Description</label>
					<div class="col-sm-10">
						<textarea id="cronsDescription_i_" name="cronsDescription_i_" class="form-control" rows="3" placeholder="Every 30 min this cron will check X. If it's Y, then A, otherwise it will B."></textarea>
					</div>
				</div>
				<div class="form-group row">
					<label for="cronsMethod_i_" class="col-sm-2 col-form-label">Method</label>
					<div class="col-sm-10">
						<input type="text" id="cronsMethod_i_" name="cronsMethod_i_" class="form-control" placeholder="my_method_name"></input>
					<span class="text-muted">Refers to a PHP method in the module class that will be executed when the cron is run.</span>
					</div>
				</div>
				<div class="form-group row">
					<label for="cronsFrequency_i_" class="col-sm-2 col-form-label">Frequency (s)</label>
					<div class="col-sm-10">
						<input type="text" id="cronsFrequency_i_" name="cronsFrequency_i_" class="form-control" placeholder="3600"></input>
					</div>
				</div>
				<div class="form-group row">
					<label for="cronsMaxRunTime_i_" class="col-sm-2 col-form-label">Max Run Time (s)</label>
					<div class="col-sm-10">
						<input type="text" id="cronsMaxRunTime_i_" name="cronsMaxRunTime_i_" class="form-control" placeholder="60"></input>
					</div>
				</div>
			</div>`
	},
	addTab : function(type){
		$('#' + type + 'Card').show()
		let i = $('#' + type + 'TabHeads').children().length+1
		
		// create, then add tab head
		let head = this.elements.tabHead
		head = head.replace('><', '>' + i + '<')
		head = head.replace(/authors/g, type)
		head = $(head)
		$('#' + type + 'TabHeads').append(head)
		
		// make tab body
		let element = $(this.elements[type + 'Form'].replace(/_i_/g, i))
		$('#' + type + 'CardBody').append(element)
		
		// set to active
		this.setActiveTab(type, i)
		this.checkButton(type)
	},
	checkButton : function(type) {
		let count = $('#' + type + 'TabHeads').children().length
		let button = $('#remove' + type.charAt(0).toUpperCase() + type.slice(1,-1) + 'Button')
		let limit = (type=='authors') ? 1 : 0
		if (count > limit && button.prop('disabled')) {
			button.prop('disabled', false)
		} else if (count <= limit && !button.prop('disabled')) {
			button.prop('disabled', true)
			if (type!='authors') $('#' + type + 'Card').hide()
		}
	},
	removeTab : function(type) {
		let active = $('#' + type + 'TabHeads li a.active').last()
		let i = active.parent().index()
		active.parent().remove()
		$('#' + type + 'Info' + (i+1)).remove()
		
		this.renumberCard(type)
		this.setActiveTab(type, i+1)
		this.checkButton(type)
	},
	renumberCard : function(type){
		// renumber tab heads
		$('#' + type + 'TabHeads li a').text(function(j){return j+1})
		
		// renumber for and id attributes in all card body info areas
		let max = $('.' + type + 'Info').length
		for (i=1; i<=max; i++){
			let info = $('#' + type + 'CardBody > div:eq(' + (i-1) + ')')
			$(info).attr('id', type + 'Info' + i)
			$(info).find('label').attr('for', function(_, s){return s.replace(/\d+/, i)})
			$(info).find('input').attr('id', function(_, s){return s.replace(/\d+/, i)})
		}
	},
	setActiveTab : function(type, i) {
		if ($('#' + type + 'TabHeads li a').length < i){i -= 1}
		$('#' + type + 'TabHeads li a').removeClass('active')
		$('#' + type + 'TabHeads > li:eq(' + (i-1) + ') a').addClass('active')
		
		$('#' + type + 'CardBody').children().hide()
		$('#' + type + 'CardBody > div:eq(' + (i-1) + ')').show()
	},
	toggleHook : function(hookButton){
		var btn = $(hookButton)
		btn.css('box-shadow', 'none')
		
		// toggle whether hook is enabled for this ex module or not
		if (btn.hasClass('active')){
			btn.siblings().remove()
			btn.removeClass('btn-primary')
			btn.closest('tr').animate({backgroundColor: '#fff'}, 500)
		} else {
			btn.before($("<input type='hidden' name='" + btn.attr('name') + "'></input>"))
			btn.addClass('btn-primary')
			btn.closest('tr').animate({backgroundColor: '#e0efff'}, 500)
		}
	},
	
	// for testing/dev:
	setMockData : function(){
		// when called on the newModule page, this function sets the form so that it should generate
		// a template identical to the test package: MyModule.zip
		$('#className').val('MyModule')
		$('#namespace').val('MyNamespace')
		$('#moduleDescription').val('This module does A, B, and C.')
		// $('#moduleInitVersion').val('1.0')
		
		$('#authorsName1').val('Clark Kent')
		$('#authorsEmail1').val('clark.kent@dailyplanet.com')
		$('#authorsOrg1').val('The Daily Planet')
		this.addTab('authors')
		$('#authorsName2').val('Lois Lane')
		$('#authorsEmail2').val('lois.lane@dailyplanet.com')
		$('#authorsOrg2').val('The Daily Planet')
		
		this.toggleHook($('button:contains(redcap_add_edit_records_page)'))
		this.toggleHook($('button:contains(redcap_control_center)'))
		
		this.addTab('links')
		$('#linksName1').val('Templater Info')
		$('#linksUrl1').val('project_mod_info.php')
		$('#linksIcon1').val('report')
		$('#linksProjectCheckbox1').prop('checked', true)
		this.addTab('links')
		$('#linksName2').val('Configure Module')
		$('#linksUrl2').val('config.php')
		$('#linksIcon2').val('report')
		$('#linksControlCenterCheckbox2').prop('checked', true)
		$('#linksNOAUTH2').prop('checked', true)
		
		this.addTab('crons')
		$('#cronsName1').val('firstCron')
		$('#cronsDescription1').val('This cron does A, B, and C.')
		$('#cronsMethod1').val('first_method')
		$('#cronsFrequency1').val('120')
		$('#cronsMaxRunTime1').val('5')
		this.addTab('crons')
		$('#cronsName2').val('cron2')
		$('#cronsDescription2').val('This cron does A, B, and C, as well.')
		$('#cronsMethod2').val('something_method2')
		$('#cronsFrequency2').val('3600')
		$('#cronsMaxRunTime2').val('60')
		
		$('#includeLicense').prop('checked', true)
		var text = $('#licenseText').val().replace('<YEAR>', "2018")
		text = text.replace('<COPYRIGHT_HOLDER_NAME>', 'Vanderbilt University Medical Center')
		$('#licenseText').val(text)
	}
}