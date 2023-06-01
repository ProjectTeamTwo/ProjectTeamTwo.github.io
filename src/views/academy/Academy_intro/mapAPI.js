var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 



// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
geocoder.addressSearch('서울특별시 종로구 삼일대로 395', function(result, status) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        var imageSrc = '../../../assets/images/hollysis/location_01.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(40, 55) // 마커이미지의 크기입니다

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);


        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage, // 마커이미지 설정
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: '<div id="marker_img" style="position:relative; width:200px; text-align:center; padding:10px; font-size:0.9em; border:2px solid salmon; border-radius:50px; background:rgb(199,47,47);color:white">할리스에프앤비 커피아카데미</div>'
        });
        $(function(){
            $('#marker_img').parent().css({'border':'0', 'background':'0'});
            $('#marker_img').parent().parent().css({'border':'0', 'background':'0'});
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    } 
}); 