	$(function(){
		var toggleHandler=null,sliderHandler=null,heroproductsHandler=null;
		$('.topbar_cart').on('mouseover',function(){
			$(this).find('.cart_area').addClass('cart_area_hover');
			var el=$(this).find('.cart_item');
			el.css('display','block');
			clearInterval(toggleHandler);
			toggleHandler=setInterval(function(){
				var height=parseInt(el.css('height'));
				if(height<=88){
					el.css('height',++height+'px');
				}else{
					clearInterval(toggleHandler);
					$('.loading').html('购物车中没有商品');
				}
			},10);
		}).on('mouseout',function(){
			$(this).find('.cart_area').removeClass('cart_area_hover');
			var el=$(this).find('.cart_item');
			clearInterval(toggleHandler);
			toggleHandler=setInterval(function(){
				var height=parseInt(el.css('height'));
				if(height>44){
					el.css('height',--height+'px');
				}else{
					el.css('display','none');
					$('.loading').html('');
					clearInterval(toggleHandler);
				}
			},10);
		});
		
		$('#miKeyword').on('focus',function(){
			$(this).parent().find('.miSearch_submit,#miKeyword').css('border','1px solid #ff6700');
			$(this).siblings('.search_hot_goods').fadeOut('fast');
			var search_keywordList=$(this).attr('data-search-item');
			search_keywordList=$.parseJSON(search_keywordList.replace(/'/g,'\"'));
			var evalText=$('#miSearch_keywordList_template').text();
			var dotText=doT.template(evalText);
			var html=dotText(search_keywordList.defaultWords);
			$('.miSearch_keyword_list').html(html).css('display','block');
		}).on('blur',function(){
			$(this).parent().find('.miSearch_submit,#miKeyword').css('border','1px solid #e0e0e0');
			$(this).siblings('.search_hot_goods').fadeIn('fast');
			$('.miSearch_keyword_list').css('display','none');
		});

		$('.search_hot_goods>a').on('mouseover',function(){
			$(this).css({'color':'#fff','backgroundColor':'#ff6700'});
		}).on('mouseout',function(){
			$(this).css({'color':'#757575','backgroundColor':'#eee'});
		});

		$('.miSearch_submit').on('mouseover',function(){
			$(this).css({'backgroundColor':'#ff6700','color':'#fff'});
		}).on('mouseout',function(){
			$(this).css({'backgroundColor':'#fff','color':'#616161'});
		});


		$('.header_nav').on('mouseenter',function(){
			$('.nav_item_link').on('mouseover',function(){
				$(this).css('color','#ff6700');
				if($(this).siblings('.item_childNav')[0]){
					var nav_itemContent=$(this).siblings('.item_childNav').html();
					$('#nav_toggleItem').stop(true).slideDown('fast').html(nav_itemContent);
				}else{
					$('#nav_toggleItem').stop(true).slideUp('fast');
				}
				}).on('mouseout',function(){
					$(this).css('color','#333');
				});
		}).on('mouseleave',function(){
			$('#nav_toggleItem').stop(true,true).slideUp('fast');
		});

		$('#nav_toggleItem').on('mouseover',function(){
			$('#nav_toggleItem').stop(true).slideDown('fast');
		}).on('mouseout',function(){
			$('#nav_toggleItem').stop(true).slideUp('fast');
		});

		$('.slider_controlPrev').on('click',function(){
			clearInterval(sliderHandler);
			var picEls=$('.sliderImg_area');
			for(var i in picEls){
				if($(picEls[i]).css('display')!=='none')break;
			}
			var prevIndex=i==0?4:--i;
			picLunbo(prevIndex);
		});

		$('.slider_controlNext').on('click',function(){
			clearInterval(sliderHandler);
			var picEls=$('.sliderImg_area');
			for(var i in picEls){
				if($(picEls[i]).css('display')!=='none')break;
			}
			var nextIndex=i==4?0:++i;
			picLunbo(nextIndex);
		});

		$('.slider_pageItem').on('click',function(event){
			event.preventDefault();
			clearInterval(sliderHandler);
			var slider_pageNowIndex=$(this).index();
			picLunbo(slider_pageNowIndex);
		});

		$('.miheroSingleProduct_controlLabel .control_prev').on('click',function(){
			if(!$(this).hasClass('control-disable'))heroproductsSlide();
		});	

		$('.miheroSingleProduct_controlLabel .control_next').on('click',function(){
			if(!$(this).hasClass('control-disable'))heroproductsSlide();
		});

		$('.miheroSingleProduct_controlLabel .control_prev,.miheroSingleProduct_controlLabel .control_next,.miRecommend_controlLabel .control_prev,.miRecommend_controlLabel .control_next').on('mouseover',function(){
			clearInterval(heroproductsHandler);
			if(!$(this).hasClass('control-disable'))$(this).css('color','#ff6700');
		}).on('mouseout',function(){
			heroproductsHandler=setInterval('heroproductsSlide();',5000);
			$(this).css('color','#b0b0b0');
		});

		$('.miMainSmartProductMoreBtn_area').on('mouseover',function(){
			$(this).find('.miMainSmartProductMoreBtn_link').css('color','#ff6700').find('i').css('backgroundColor','#ff6700');
		}).on('mouseout',function(){
			$(this).find('.miMainSmartProductMoreBtn_link').css('color','#424242').find('i').css('backgroundColor','#b0b0b0');
		});

		$('.miMainVideoMoreBtn_area').on('mouseover',function(){
			$(this).find('.miMainVideoMoreBtn_link').css('color','#ff6700').find('i').css('backgroundColor','#ff6700');
		}).on('mouseout',function(){
			$(this).find('.miMainVideoMoreBtn_link').css('color','#424242').find('i').css('backgroundColor','#b0b0b0');
		});

		$('.miMainMatch_area .miMainKindToolBar_item>li').on('mouseover',function(){
			var hover_index=$(this).index();
			$(this).parent().children().removeClass('miMainKindToolBar_item_active');
			$(this).addClass('miMainKindToolBar_item_active');
			$('.miMainMatch_area .miMainProductsItem_rightArea').css('display','none');
			$('.miMainMatch_area .miMainProductsItem_rightArea').eq(hover_index).css('display','block');
		});

		$('.miMainAccessories_area .miMainKindToolBar_item>li').on('mouseover',function(){
			var hover_index=$(this).index();
			$(this).parent().children().removeClass('miMainKindToolBar_item_active');
			$(this).addClass('miMainKindToolBar_item_active');
			$('.miMainAccessories_area .miMainProductsItem_rightArea').css('display','none');
			$('.miMainAccessories_area .miMainProductsItem_rightArea').eq(hover_index).css('display','block');
		});

		$('.miMainPeripheral_area .miMainKindToolBar_item>li').on('mouseover',function(){
			var hover_index=$(this).index();
			$(this).parent().children().removeClass('miMainKindToolBar_item_active');
			$(this).addClass('miMainKindToolBar_item_active');
			$('.miMainPeripheral_area .miMainProductsItem_rightArea').css('display','none');
			$('.miMainPeripheral_area .miMainProductsItem_rightArea').eq(hover_index).css('display','block');
		});

		$('.miMainRecommend_area .control_prev').on('click',function(){
			var leftSpan=parseInt($('.miMainRecommend_area .miMainRecommendSliderWrap_area').css('marginLeft'));
			if(leftSpan==-3720||leftSpan==-2480||leftSpan==-1240){
				if(leftSpan<-1240){
					if($(this).hasClass('control-disable'))$(this).removeClass('control-disable');
				}else if(leftSpan==-1240){
					$(this).addClass('control-disable');
				}
				if($(this).siblings('.control_next').hasClass('control-disable'))$(this).siblings('.control_next').removeClass('control-disable');
				$('.miMainRecommend_area .miMainRecommendSliderWrap_area').css('marginLeft',leftSpan+1240+'px');
			}
		});

		$('.miMainRecommend_area .control_next').on('click',function(){
			var leftSpan=parseInt($('.miMainRecommend_area .miMainRecommendSliderWrap_area').css('marginLeft'));
			if(leftSpan==0||leftSpan==-1240||leftSpan==-2480){
				if(leftSpan>-2480){
					if($(this).hasClass('control-disable'))$(this).removeClass('control-disable');
				}else if(leftSpan==-2480){
					$(this).addClass('control-disable');
				}
				if($(this).siblings('.control_prev').hasClass('control-disable'))$(this).siblings('.control_prev').removeClass('control-disable');
				$('.miMainRecommend_area .miMainRecommendSliderWrap_area').css('marginLeft',leftSpan-1240+'px');
			}
		});

		$('.miMainContent_controlLabel_area .control_prev').on('click',function(){
			var sliderContentEl=$(this).parent().siblings('.miMainContent_sliderContent').children('.miMainContent_sliderContentWrap');
			var leftSpan=parseInt(sliderContentEl.css('marginLeft'));
			var slider_step=parseInt(sliderContentEl.parents('li.miMainContent_item').css('width'));
			var slider_els=sliderContentEl.children('li').size();
			var specArr=[0];
			for(var i=1;i<slider_els;i++){
				specArr.push(-slider_step*i);
			}
			if(leftSpan<0&&$.inArray(leftSpan,specArr)!==-1){
				var indicator_index=Math.abs(leftSpan)/(slider_step*slider_els)*slider_els-1;
				sliderContentEl.css('marginLeft',leftSpan+slider_step+'px');
				sliderContentEl.parent().siblings('.miMainContent_sliderItemPage_area').find('.miMainContent_sliderItemPage_item').removeClass('miMainContent_sliderItemPage_itemActive');
				sliderContentEl.parent().siblings('.miMainContent_sliderItemPage_area').find('.miMainContent_sliderItemPage_item').eq(indicator_index).addClass('miMainContent_sliderItemPage_itemActive');
			}
		});

		$('.miMainContent_controlLabel_area .control_next').on('click',function(){
			var sliderContentEl=$(this).parent().siblings('.miMainContent_sliderContent').children('.miMainContent_sliderContentWrap');
			var leftSpan=parseInt(sliderContentEl.css('marginLeft'));
			var slider_step=parseInt(sliderContentEl.parents('li.miMainContent_item').css('width'));
			var slider_els=sliderContentEl.children('li').size();
			var specArr=[0];
			for(var i=1;i<slider_els;i++){
				specArr.push(-slider_step*i);
			}
			if(leftSpan>-(slider_step*(slider_els-1))&&$.inArray(leftSpan,specArr)!==-1){
				var indicator_index=Math.abs(leftSpan)/(slider_step*slider_els)*slider_els+1;
				sliderContentEl.css('marginLeft',leftSpan-slider_step+'px');
				sliderContentEl.parent().siblings('.miMainContent_sliderItemPage_area').find('.miMainContent_sliderItemPage_item').removeClass('miMainContent_sliderItemPage_itemActive');
				sliderContentEl.parent().siblings('.miMainContent_sliderItemPage_area').find('.miMainContent_sliderItemPage_item').eq(indicator_index).addClass('miMainContent_sliderItemPage_itemActive');
			}
		});
			
		$('.miMainContent_sliderItemPageWrap>li.miMainContent_sliderItemPage_item').on('click',function(){
			var click_index=$(this).index();
			var now_index=$(this).parent().find('li.miMainContent_sliderItemPage_itemActive').index();
			$(this).parent().find('li.miMainContent_sliderItemPage_item').removeClass('miMainContent_sliderItemPage_itemActive');
			$(this).parent().find('li.miMainContent_sliderItemPage_item').eq(click_index).addClass('miMainContent_sliderItemPage_itemActive');
			if(click_index!=now_index){
				var move_span=-(click_index-now_index)*parseInt(($(this).parents('.miMainContent_item').css('width')));
				var now_marginLeft=parseInt($(this).parents('.miMainContent_item').find('.miMainContent_sliderContentWrap').css('marginLeft'));
				$(this).parents('.miMainContent_item').find('.miMainContent_sliderContentWrap').css('marginLeft',now_marginLeft+move_span+'px');
			}
		});

		sliderHandler=setInterval('picLunbo();',5000);
		heroproductsHandler=setInterval('heroproductsSlide();',5000);
	});

	function picLunbo(nextIndex){
		var picEls=$('.sliderImg_area');
		for(var i in picEls){
			if($(picEls[i]).css('display')!=='none')break;
		}
		var nowIndex=i;
		nextIndex=nextIndex==undefined?(nowIndex==4?0:(+nowIndex+1)):nextIndex;
		$('.sliderImg_area').eq(nextIndex).css({
			'zIndex':50
		}).fadeIn(500);
		$('.sliderImg_area').eq(nowIndex).css('zIndex',0).fadeOut(500,function(){
			$(this).css('display','none');
		});
		setIndicator(nextIndex);
	}

	function setIndicator(index){
		$('.slider_pageLink').each(function(){
			if($(this).hasClass('slider_pageLink_active'))$(this).removeClass('slider_pageLink_active');
		});
		$('.slider_pageLink').eq(index).addClass('slider_pageLink_active');
	}

	function heroproductsSlide(){
		var heroproductsSlideMarginLeft=parseInt($('.miheroProducts_itemsArea').css('marginLeft'));
		if(heroproductsSlideMarginLeft==0){
			$('.miheroProducts_itemsArea').css('marginLeft','-1240px');
			$('.miheroSingleProduct_controlLabel .control_next').addClass('control-disable');
			$('.miheroSingleProduct_controlLabel .control_prev').removeClass('control-disable');
		}else if(heroproductsSlideMarginLeft<0){
			$('.miheroProducts_itemsArea').css('marginLeft','0px');
			$('.miheroSingleProduct_controlLabel .control_next').removeClass('control-disable');
			$('.miheroSingleProduct_controlLabel .control_prev').addClass('control-disable');
		}
	}