/* scrolla */
$(document).ready(function(){
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 결과 출력
    if (isMobile) {
        console.log("모바일 기기를 사용 중입니다.");

        $('.project-card').attr('data-duration', '0.3s')
        $('.project-card').attr('data-delay', '0')
        $('.project-card').attr('data-animate', 'fadeInRight')

        $('.pcard').attr('data-duration', '0.3s')
        $('.pcard').attr('data-delay', '0')
        $('.pcard').attr('data-animate', 'fadeInRight')


    } else {
        console.log("데스크톱 기기를 사용 중입니다.");
    }


    $('.animate').scrolla(
        {
            mobile: true,
        }
    );

});

/* typing */
$(document).ready(function(){

    
    typing('#type', '#type2', 0)
    typing('#type3','', 2500)

    /* 헤더 메뉴 부드러운 슬라이드 */
    var header = $("header");
    var headerHeight = header.outerHeight();

    $("nav a, a.link").not('.drawer-list-item').on("click", function(e) {
        e.preventDefault();

        var targetId = $(this).attr("href");
        var targetSection = $(targetId);
        var targetOffset = targetSection.offset().top - headerHeight;

        $("html, body").stop().animate({
            scrollTop: targetOffset
        }, 800);
        header.addClass("active");
    });

    /* 헤더 active */
    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();

        // Check if the scroll position is greater than 100px
        if (scrollPosition > 100) {
            header.addClass("active");
        } else {
            header.removeClass("active");
        }

    });
});

function typing(el, to, delay) {
    if( el == undefined || el == '' ) {
        return
    }

    if( delay != 0 ) {
        setTimeout( function() {
            typing(el, to, 0)
        }, delay)
        return
    }

    var $text = $(el)
    var text = $text.text();
    $text.text("");
    $text.css('color', 'black')
    let i = 0
    let timer = setInterval( function() {
        $text.append(text.charAt(i++));
        if( i >= text.length ) {
            clearInterval(timer)
            $text.addClass('done')
            typing(to)
        }
    }, 80)
}


/* skills */
var barsAnimated = false;
var mbtiAnimated = false;

// skills
function animateBars() {
    var bars = document.querySelectorAll('.bar').forEach((bar) => {
        var percentage = bar.getAttribute("data-percent");
    
        var loading = setInterval(progressBar, 15);
        var progress = 0;
    
        // animation of skillbar loading
        function progressBar() {
            if (progress >= percentage) {
                clearInterval(loading);
                bar.childNodes[0].innerHTML = percentage + '%';
            } else {
                progress++;
                bar.style.width = progress + '%';
            }
        }
    });
}

// MBTI animation
function animateMBTI() {
    var radius = document.querySelector('circle').getAttribute('r');
    var circumference = 2 * radius * Math.PI;

    var circles = document.querySelectorAll('.pie').forEach((circle) => {
        var num = circle.getAttribute("data-percent");
        circle.setAttribute('stroke-dasharray', circumference);

        var currentCount = 0;
        var maxCircum = (num / 100) * circumference;

        var intervalId = setInterval(function () {
            var currentCircum = (currentCount / num) * circumference;

            if (currentCircum > maxCircum) {
                clearInterval(intervalId);
                return;
            }
            var offset = (1 - currentCount / num) * circumference;
            var progress = circle.childNodes[3].setAttribute('stroke-dashoffset', offset);

            currentCount++;
        }, 15);
    });

    var nums = document.querySelectorAll('.number').forEach((num) => {
        var currentNum = 0;
        var maxNum = num.getAttribute("data-num");

        var intervalId = setInterval(function () {
            if (currentNum > maxNum) {
                clearInterval(intervalId);
                return;
            }
            num.innerHTML = currentNum + '%';
            currentNum++;
        }, 20);
    });
}

// 요소가 뷰 포트에 있는지 확인
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 스크롤 이벤트
function handleScroll() {
    var barsElement = document.querySelector('.bar');
    var mbtiElement = document.querySelector('.pie');
    var projectElement = document.querySelector('#Project');

    if (isInViewport(barsElement) && !barsAnimated) {
        animateBars();
        barsAnimated = true;
    } else if (!isInViewport(barsElement)) {
        barsAnimated = false;
    }

    if (isInViewport(mbtiElement) && !mbtiAnimated) {
        animateMBTI();
        mbtiAnimated = true;
    } else if (!isInViewport(mbtiElement)) {
        mbtiAnimated = false;
    }

    var rect = projectElement.getBoundingClientRect();
    var projectSectionY = rect.top + window.scrollY;   // 요소의 상대적인 y 좌표 위치

    
    if ( $(window).scrollTop() >= projectSectionY ) {
        $('.project-nav').show()
    } else {
        $('.project-nav').hide()
    }
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);




// slick slide
$(function() {

    var slideOption = {
        dots: false,
        arrows: true,

        autoplay: true,                 // 자동재생 여부
        autoplaySpeed: 3000,            // 자동재생 슬라이드 시간
        infinite: true,                 // 무한 반복 
        speed:500,                      // 슬라이드가 전환되는 시간

        // centerMode: true,            // 센터 모드
        // centerPadding: '60px',       // 센터 모드 시, 내부여백
        slidesToShow: 1,                // 보여질 슬라이드 개수
        slidesToScroll: 1,              // 스크롤될 슬라이드 개수

        pauseOnDotsHover: true,         // 페이지네이션 호버 시 자동재생 멈춤
        pauseOnFocus: true,             // 포커스 시, 자동재생 멈춤
        pauseOnHover: true,             // 호버 시, 자동재생 멈춤

        /* 효과 */
        // fade: true,
        // cssEase: 'linear',

        // 네비게이션 화살표 커스텀
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></btton>',

        //
        // asNavFor: '.slide01-nav',

        /* 반응형 */
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
    
        ]
    }

    var slideNavOption = {
        dots: false,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,

        pauseOnDotsHover: true,         // 페이지네이션 호버 시 자동재생 멈춤
        pauseOnFocus: true,             // 포커스 시, 자동재생 멈춤
        pauseOnHover: true,             // 호버 시, 자동재생 멈춤
        
        centerMode: true,
        focusOnSelect: true,
        // asNavFor: '#slide01',
    }

    /* -------------------- 슬라이드01 -------------------- */
    $('#slide01').slick({...slideOption, asNavFor: '.slide01-nav'})
    $('.slide01-nav').slick({...slideNavOption, asNavFor: '#slide01'})

    /* -------------------- 슬라이드02 -------------------- */
    $('#slide02').slick({...slideOption, asNavFor: '.slide02-nav'})
    $('.slide02-nav').slick({...slideNavOption, asNavFor: '#slide02'})
    
    /* -------------------- 슬라이드03 -------------------- */
    $('#slide03').slick({...slideOption, asNavFor: '.slide03-nav'})
    $('.slide03-nav').slick({...slideNavOption, asNavFor: '#slide03'})
    
    /* -------------------- 슬라이드04 -------------------- */
    $('#slide04').slick({...slideOption, asNavFor: '.slide04-nav'})
    $('.slide04-nav').slick({...slideNavOption, asNavFor: '#slide04'})
    
    /* -------------------- 슬라이드05 -------------------- */
    $('#slide05').slick({...slideOption, asNavFor: '.slide05-nav'})
    $('.slide05-nav').slick({...slideNavOption, asNavFor: '#slide05'})

    
    /* -------------------- 슬라이드06 -------------------- */
    $('#slide06').slick({...slideOption, asNavFor: '.slide06-nav'})
    $('.slide06-nav').slick({...slideNavOption, asNavFor: '#slide06'})
    
    /* -------------------- 슬라이드07 -------------------- */
    $('#slide07').slick({...slideOption, asNavFor: '.slide07-nav'})
    $('.slide07-nav').slick({...slideNavOption, asNavFor: '#slide07'})
    
    /* -------------------- 슬라이드08 -------------------- */
    $('#slide08').slick({...slideOption, asNavFor: '.slide08-nav'})
    $('.slide08-nav').slick({ ...slideNavOption, asNavFor: '#slide08' })
    
    $('#slide09').slick({...slideOption, asNavFor: '.slide09-nav'})
    $('.slide09-nav').slick({ ...slideNavOption, asNavFor: '#slide09' })
    
    $('#slide10').slick({...slideOption, asNavFor: '.slide10-nav'})
    $('.slide10-nav').slick({...slideNavOption, asNavFor: '#slide10'})


})

/* nav */
$(function() {
    var $document = $(document),
        $header = {
            drawerToggle : $('.nav')  // 네비게이션 메뉴 
        },
        $drawer = {
            this : $('.layout-drawer'),
            dropdownToggle : $('.drawer-dropdown-toggle')
        },
        $dim = $('.layout-dim')
    
    // 버튼 클릭 여부에 따라 드로어 열고 닫기
    $header.drawerToggle.click(function() {
        $drawer.this.toggleClass('is-open');
        $dim.toggleClass('active')
    });
    // 드로외 외부 클릭 시 닫기
    $dim.click(function() {
        $drawer.this.toggleClass('is-open');
        $dim.toggleClass('active')
    });
    // ESC 키 누르면 닫기
    $document.keyup(function(e) {
        if (e.keyCode == 27) {
            if ($drawer.this.hasClass('is-open')) {
                $drawer.this.removeClass('is-open');
                $dim.toggleClass('active')
            }
        }
    });
    // 서브 네비게이션 여부
    $drawer.dropdownToggle.each(function() {
        var target = $(this).data('target');
        $(this).click(function() {
            $(target).slideToggle(300);
            
        });
    });
    

    $('.drawer-list-item').on('click', function() {
        $('.drawer-list-item').removeClass('is-active')

        $(this).addClass('is-active')

        $drawer.this.toggleClass('is-open');
        $dim.toggleClass('active')
    })
});
