$(function(){
	$('#authorsCard').append(newAuthorInfo(1))
})

function newAuthorInfo(i){
	return `<div class="authorInfo" id="authorInfo${i}">
				<div class="form-group row">
					<label for="authorName${i}" class="col-sm-2 col-form-label">Author Name</label>
					<div class="col-sm-10">
						<input type="text" id="authorName${i}" class="form-control" placeholder="John A. Smith"></input>
					</div>
				</div>
				<div class="form-group row">
					<label for="authorEmail${i}" class="col-sm-2 col-form-label">Email Address</label>
					<div class="col-sm-10">
						<input type="text" id="authorEmail${i}" class="form-control mb-1" placeholder="john.smith@abc.org"></input>
					</div>
				</div>
				<div class="form-group row">
					<label for="authorOrg${i}" class="col-sm-2 col-form-label">Organization</label>
					<div class="col-sm-10">
						<input type="text" id="authorOrg${i}" class="form-control" placeholder="ABC Research"></input>
					</div>
				</div>
			</div>`
}

function toggleHook(hookButton){
	var btn = $(hookButton)
	btn.css('box-shadow', 'none')
	
	// toggle whether hook is enabled for this ex module or not
	if (btn.hasClass('active')){
		btn.prop('data-active', false)
		btn.removeClass('btn-primary')
		btn.closest('tr').animate({backgroundColor: '#fff'}, 500)
	} else {
		btn.prop('data-active', true)
		btn.addClass('btn-primary')
		btn.closest('tr').animate({backgroundColor: '#e0efff'}, 500)
	}
}

function addAuthor(){
	// add a new tab so user can enter information for an nth author
	var tabs = $('#authorTabs')
	$('#authorTabs li a').removeClass('active')
	tabs.append(`<li class="nav-item">
					<a class="nav-link active" onclick="setActiveAuthor($(this).parent().index()+1)">${tabs.children().length+1}</a>
				</li>`)
	
	// add a matching authorInfo set of form inputs and switch card's current group to the new one
	let i = $('#authorsCard').children().length + 1
	$('#authorsCard').append(newAuthorInfo(i))
	$('#authorsCard').children().last().siblings().css("display", "none")
}

function deleteActiveAuthor(){
	
}

function setActiveAuthor(i){
	// console.log(i)
	// hide all authorInfo groups and deactivate all nav-links
	$('.authorInfo').css('display', 'none')
	$('#authorTabs li a').removeClass('active')
	
	// activate/display i-th author
	$('#authorInfo' + i).css('display', 'block')
	$('#authorTabs li:nth-child(' + i + ') a').addClass('active')
}