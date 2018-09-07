
// require one author
$(function(){
	$('#authorsCard').css('display:block')
	formsGenerator.addTab($('#authorsCard'))
	$('#authorsCard').find('input').prop('required', true)
})

// object that holds ui related functions
formsGenerator = {
	addTab(type){
		
	}
	removeTab(type){
		
	}
	setActiveTab(type, i){
		
	}
	
	elements = {
		tabHead = `<li class="nav-item">
						<a class="nav-link active" onclick="setActiveTab($(this).parent().index()+1)"></a>
					</li>`,
		authorsTabBody = 
}

