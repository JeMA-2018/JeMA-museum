설import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Calendar, ChevronRight, Menu, X, Instagram, User, Tag, ArrowLeft, ChevronLeft, Plus } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [view, setView] = useState('home'); // 'home' or 'archive'
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [currentSpaceImageIndex, setCurrentSpaceImageIndex] = useState(0);

  // 전시장 내부 이미지
  const spaceImages = [
    "https://i.postimg.cc/kXCHr9nH/inside1.jpg",
    "https://i.postimg.cc/vHvNbjTx/inside2.jpg",
    "https://i.postimg.cc/dVtS1BZt/inside3.jpg",
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 전시 데이터 (ID 중복 수정 및 고유 ID 부여)
  const exhibitions = [
    {
      id: 1,
      title: "한글이 숨 쉬다Ⅱ",
      period: "2026. 05. 01 - 05. 29",
      status: "현재 전시",
      statusKey: "upcoming",
      year: 2026,
      images: [
        "https://i.postimg.cc/pV1pF7DB/fontart.png"
      ],
      description: "작년도에 첫 번째로 시작한 한글이 숨 쉬다 -폰트아트모색전- 이 한글 서예의 아름다움과 장르간의 융합을 통한 조형적 아름다움을 모색하며 주목을 받은 바 있습니다. 금년에도 그 전시의 의미를 좀 더 넓게 하고자 전시회를 엽니다.",
      location: "제1전시실",
      genre: "-",
      artists: "김춘선, 박인선, 송하진, 이동근, 이성재, 이적요, 이희춘, 조병철, 차유림, 최동명"
    },
    {
      id: 2,
      title: "2026 JeMA 상설전시",
      period: "2026. 02. 02 - 06. 30",
      status: "상설 전시",
      statusKey: "current",
      year: 2026,
      images: [
        "https://i.postimg.cc/Pqx0rM30/asddasd.png",
        "https://i.postimg.cc/k5Y0BNs2/image02.png",
        "https://i.postimg.cc/v8C65pDy/image.jpg",
        "https://i.postimg.cc/j2PmgpbZ/image01.png"
      ],
      description: "“Art New Wave” 현대미술의 새물결",
      location: "-",
      genre: "미디어 아트, 설치미술",
      artists: "김관수, 박성식, 박종갑, 박혜경, 이기홍, 이은경, 이적요, 정지은"
    },
    {
      id: 3,
      title: "재탄생의 시간",
      period: "2026. 01. 14 - 02. 08",
      status: "지난 전시",
      statusKey: "past",
      year: 2026,
      images: [
        "https://i.postimg.cc/50yPSk5v/433025-142921-446.jpg",
        "https://i.postimg.cc/wT2b1T4T/gongsaeng.png",
        "https://i.postimg.cc/yxj46hSd/hansug.png",
        "https://i.postimg.cc/x86TCNkn/ijinhwa.png"
      ],
      description: "버려진 사물들이 더 이상 소모된 대상이 아닌, 새로운 의미를 생산하는 예술적 오브제로 전환되는 과정을 보여줍니다. 이를 통해 환경문제와 삶의 방식, 예술의 사회적 역할에 대해 다시 한 번 생각해 보는 계기가 되길 바라는 초대기획전, ‘재탄생의 시간‘",
      location: "-",
      genre: "환경예술",
      artists: "고보연, 김덕신, 김행령, 한 숙, 이진화, 박인선"
    },
    {
      id: 4,
      title: "다양성의 미학",
      period: "2025. 11. 06 - 11. 19",
      status: "지난 전시",
      statusKey: "past",
      year: 2025,
      images: [
        "https://i.postimg.cc/DZNkSQvh/580809653-24878311171854181-8358558768161940266-n.jpg",
        "https://i.postimg.cc/j2VXLC7V/dayangseong-uimihag2.jpg",
        "https://i.postimg.cc/j2zhNKHQ/dayangseong-uimihag3.jpg"
      ],
      description: "각자의 빛으로 세상을 비추는 작가들의 작업을 통해, 동시대 미술이 지닌 '다양성'의 가치를 발견하고 새로운 영감을 공유하는 전시",
      location: "-",
      genre: "혼합 매체",
      artists: "김동희, 김동주, 김두해, 김선태, 김시현, 김장혁, 김춘선, 김한창, 도병락, 문주호, 박은화, 박인희, 박진영, 선기현, 성태식, 신민경, 양규준, 조 헌, 조병철, 조민아, 조재천, 차유림, 채우승, 최승일, 텐진쬔뒤, 한은주, 홍선기"
    },
    {
      id: 5,
      title: "정음(正音)",
      period: "2025. 09. 01 - 10. 26",
      status: "지난 전시",
      statusKey: "past",
      year: 2025,
      images: [
        "https://i.postimg.cc/3WMB6NBC/jeong-eumjeon.jpg",
        "https://i.postimg.cc/V6VDJQMX/jeong-eumjeon.jpg"
      ],
      description: "“청년의 목소리, 서예로 피어나다“\n세종대왕이 한글 창제를 통해 백성을 위한 소통의 시대를 열었던 것처럼, 오늘을 살아가는 청년들이 ’한글서예‘를 통해 다양한 표현 방법으로 시대 소리를 담아내는 전시",
      location: "-",
      genre: "서예",
      artists: "구청미, 김용재, 김윤주, 박성호, 송이슬, 유명기, 윤성민, 윤정연, 이대근, 이문종, 이민성, 이보배, 이수진, 이신영, 이정화, 임지선, 장순영, 전정연,정준식, 조용연"
    },
    {
      id: 6,
      title: "빛의 회복",
      period: "2025. 08. 13 - 08. 23",
      status: "지난 전시",
      statusKey: "past",
      year: 2025,
      images: [
        "https://i.postimg.cc/4d7pgZnb/image.jpg",
      ],
      description: "'빛(光)의 회복(回復) 광복80주년기념 빛의 인물'展",
      location: "-",
      genre: "한국화, 서양화, 조각, 공예, 서예, 닥종이, 카본아트 등",
      artists: "강종수, 김경희, 김영종, 김종도, 박인선, 배병희, 송규상, 양청문, 이동근, 이성재, 차유림"
    },
    {
      id: 7,
      title: "한글이 숨 쉬다",
      period: "2025. 06. 25 - 7. 13",
      status: "지난 전시",
      statusKey: "past",
      year: 2025,
      images: [
        "https://i.postimg.cc/NjhkDKJR/illeoseuteu3.png",
      ],
      description: "한글을 소재로한 예술은 서예만 해당되는가의 의문에서 착안했다. 한글의 전승가치를 잇고, 법고(法古)의 과정에 더하여 새로움을 만들어 가는 창신(創新)의 과정을 강조하고자 한다.",
      location: "-",
      genre: "시각예술, 서예 융복합",
      artists: "김춘선, 송하진, 이기전, 이동근, 이성재, 이일청, 장석원, 최동명 등 8인"
    },
    {
      id: 8,
      title: "빛나는 상흔",
      period: "2025. 05. 01 - 5. 28",
      status: "지난 전시",
      statusKey: "past",
      year: 2025,
      images: [
        "https://i.postimg.cc/rpG0SJzx/2728287076-1746114393-5013.jpg",
      ],
      description: "현재를 살아가는 여성들의 감정, 덧없지만 찬란한 생의 순간들, 그리고 전통의 흔적 속에서 미래를 조망하는 시선을 담은 전시.",
      location: "-",
      genre: "회화, 미디어 아트",
      artists: "김미숙",
    },
    {
      id: 9,
      title: "판각(版刻) 여정",
      period: "2025. 04. 05 - 4. 29",
      status: "지난 전시",
      statusKey: "past",
      year: 2025,
      images: [
        "https://i.postimg.cc/xjLmY99J/daunlodeu-(10).jpg",
      ],
      description: "전업 판화가로서 전국을 다니며 사람들의 삶과 자연을 사랑했고, 이 과정에서 만난 마을과 사람들, 대나무 숲, 바다와 섬은 나의 작업에 녹아들었다, 특히 유년 시절 추억 속 대나무 숲과 그 바람 소리는 나의 지속적인 창작의 원천이기도 하다.\n내 작품의 그 여정에서 만난 사생과 사색의 기록들이고, 그 현장을 가슴에 담아 작업실에 앉아 되새김하여 그려낸 “있는 풍경“, “있을 법한 풍경“, “있어야만 하는 풍경“ 이 내가 그린 판화 세상이고, 내가 그린 꿈인 것이다.",
      location: "-",
      genre: "목판화",
      artists: "김준권",
    },
    {
      id: 10,
      title: "만경(萬頃)_수묵여정(水墨旅程)",
      period: "2025. 01. 01 - 02. 10",
      status: "지난 전시",
      statusKey: "past",
      year: 2025,
      images: [
        "https://i.postimg.cc/jqzrhFhL/835113-153266-429.jpg",
      ],
      description: "비가시적 영혼과 대화하려는 존재의 몸이 불완전한 집착과 분별을 넘어 초월적 영혼을 만나려는 행려의 여정이다. 지명이 명시되지 않고 오직 작가만이 알고 그려내는 상상의 숲길을 걸어가는 그의 여정은 끝이 없어 보인다.",
      location: "-",
      genre: "수묵화",
      artists: "박종갑"
    }
  ];

  // 모달 오픈 시 인덱스 초기화 및 스크롤 방지
  useEffect(() => {
    if (selectedExhibition) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedExhibition]);

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (!selectedExhibition) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedExhibition.images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (!selectedExhibition) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedExhibition.images.length) % selectedExhibition.images.length);
  };

  const handleNextSpaceImage = (e) => {
    e.stopPropagation();
    setCurrentSpaceImageIndex((prev) => (prev + 1) % spaceImages.length);
  };

  const handlePrevSpaceImage = (e) => {
    e.stopPropagation();
    setCurrentSpaceImageIndex((prev) => (prev - 1 + spaceImages.length) % spaceImages.length);
  };

  const scrollToTop = () => window.scrollTo(0, 0);

  const navigateToArchive = () => {
    setView('archive');
    scrollToTop();
  };

  const navigateToHome = () => {
    setView('home');
    scrollToTop();
  };

  const navigateToVisit = (e) => {
    e.preventDefault();
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('visit');
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('visit');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const openCurrentExhibition = (e) => {
    e.preventDefault();
    const currentExhibition = exhibitions.find(ex => ex.statusKey === 'current');
    if (currentExhibition) {
      setSelectedExhibition(currentExhibition);
    }
  };

  const scrollToVisit = (e) => {
    e.preventDefault();
    const el = document.getElementById('visit');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const posterAspectClass = "aspect-[1/1.414]";

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={navigateToHome}>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase">전주현대미술관 JeMA</h1>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={navigateToHome} className={`hover:text-neutral-900 transition-colors font-medium text-sm lg:text-base ${view === 'home' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-500'}`}>홈</button>
              <button onClick={navigateToArchive} className={`hover:text-neutral-900 transition-colors font-medium text-sm lg:text-base ${view === 'archive' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-500'}`}>전시 목록</button>
              <button onClick={() => setIsSpaceModalOpen(true)} className="text-neutral-500 hover:text-neutral-900 transition-colors font-medium text-sm lg:text-base">전시실 내부</button>
              <a href="#visit" onClick={navigateToVisit} className="text-neutral-500 hover:text-neutral-900 transition-colors font-medium text-sm lg:text-base">관람 안내 및 오시는 길</a>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-neutral-600 hover:text-neutral-900">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100 px-4 pt-2 pb-6 space-y-1 shadow-lg">
            <button 
              onClick={() => { navigateToHome(); setIsMenuOpen(false); }} 
              className={`block w-full text-left px-3 py-4 text-base font-medium rounded-md ${view === 'home' ? 'text-neutral-900 bg-neutral-50' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}`}
            >
              홈
            </button>
            <button 
              onClick={() => { navigateToArchive(); setIsMenuOpen(false); }} 
              className={`block w-full text-left px-3 py-4 text-base font-medium rounded-md ${view === 'archive' ? 'text-neutral-900 bg-neutral-50' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}`}
            >
              전시 목록
            </button>
            <button 
              onClick={() => { setIsSpaceModalOpen(true); setIsMenuOpen(false); }} 
              className="block w-full text-left px-3 py-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md"
            >
              전시실 내부
            </button>
            <a 
              href="#visit" 
              onClick={(e) => { navigateToVisit(e); setIsMenuOpen(false); }} 
              className="block w-full text-left px-3 py-4 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md"
            >
              관람 안내 및 오시는 길
            </a>
          </div>
        )}
      </nav>

      {view === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="relative pt-20 pb-8 md:pt-32 md:pb-12 lg:pt-48 lg:pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
              <p className="mt-6 md:mt-10 text-xs md:text-base text-neutral-500 font-semibold tracking-wider uppercase mb-3 md:mb-6">Jeonju Museum of Contemporary Art</p>
              <h2 className="text-neutral-900 leading-[1.2] md:leading-[1.1] mb-6 md:mb-8">
                <div className="text-xl sm:text-2xl md:text-5xl font-black mb-1 md:mb-3 tracking-tighter uppercase text-neutral-800">Delight, Imagine, Creative, Share</div>
                <div className="text-lg sm:text-xl md:text-4xl font-bold mb-1 md:mb-2">즐거운, 상상하는, 창조하는, 공유하는</div>
                <div className="text-lg sm:text-xl md:text-4xl font-bold">전주의 현대 공간.</div>
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
                <button onClick={openCurrentExhibition} className="inline-flex justify-center items-center px-6 py-3 md:px-8 md:py-4 border border-transparent text-sm md:text-base font-bold rounded-full text-white bg-neutral-900 hover:bg-neutral-800 transition-all shadow-xl">현재 전시 보기</button>
                {/* Desktop: 전시 목록 */}
                <button onClick={navigateToArchive} className="hidden md:inline-flex justify-center items-center px-6 py-3 md:px-8 md:py-4 border border-neutral-300 text-sm md:text-base font-medium rounded-full text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">전시 목록</button>
                {/* Mobile: 관람 안내 */}
                <button onClick={scrollToVisit} className="inline-flex md:hidden justify-center items-center px-6 py-3 border border-neutral-300 text-sm font-medium rounded-full text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">관람 안내</button>
              </div>
            </div>
          </section>

          {/* Featured Exhibitions Section */}
          <section id="exhibitions" className="pt-8 pb-12 md:pt-12 md:pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8 md:mb-16">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black text-neutral-900 mb-2 md:mb-4 uppercase tracking-tighter">전시 목록</h3>
                  <p className="text-neutral-500 text-sm md:text-lg">전주현대미술관의 발자취를 경험하세요</p>
                </div>
                {/* 우측 전체 보기 버튼 추가 */}
                <button 
                  onClick={navigateToArchive}
                  className="hidden md:flex items-center gap-2 px-6 py-3 border border-neutral-200 rounded-full text-sm font-bold hover:bg-neutral-50 transition-all text-neutral-700 group"
                >
                  모든 전시 목록 <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-14">
                {exhibitions.slice(0, 3).map((exhibition) => (
                  <div key={exhibition.id} className="group cursor-pointer flex flex-col" onClick={() => setSelectedExhibition(exhibition)}>
                    <div className={`relative ${posterAspectClass} overflow-hidden bg-neutral-100 mb-2 md:mb-6 rounded-lg md:rounded-2xl shadow-sm group-hover:shadow-2xl transition-all duration-500`}>
                      <img src={exhibition.images[0]} alt={exhibition.title} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
                      <div className="absolute top-2 left-2 md:top-5 md:left-5">
                        <span className={`px-2 py-1 md:px-4 md:py-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md shadow-sm ${exhibition.statusKey === 'upcoming' ? 'bg-black text-white' : exhibition.statusKey === 'current' ? 'bg-blue-600 text-white' : 'bg-white/90 text-neutral-900'}`}>
                          {exhibition.status}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-xs sm:text-sm md:text-2xl font-bold text-neutral-900 mb-1 md:mb-3 group-hover:text-neutral-600 transition-colors leading-tight whitespace-pre-line">{exhibition.title}</h4>
                    <div className="flex items-center text-neutral-500 font-medium text-[10px] sm:text-xs md:text-base">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> {exhibition.period}
                    </div>
                  </div>
                ))}
              </div>

              {/* 모바일 전용 하단 버튼 */}
              <div className="mt-12 md:hidden">
                <button 
                  onClick={navigateToArchive}
                  className="w-full flex justify-center items-center gap-2 px-6 py-4 border border-neutral-200 rounded-xl text-base font-bold text-neutral-700"
                >
                  모든 전시 목록 보기 <Plus size={20} />
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Archive View */
        <section className="pt-24 md:pt-32 pb-12 md:pb-24 bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={navigateToHome} className="flex items-center text-neutral-400 hover:text-neutral-900 mb-8 md:mb-12 transition-colors font-medium text-sm md:text-base">
              <ArrowLeft size={20} className="mr-2 w-4 h-4 md:w-5 md:h-5" /> 홈으로 돌아가기
            </button>
            <div className="mb-8 md:mb-20">
              <h2 className="text-2xl md:text-5xl font-black text-neutral-900 mb-2 md:mb-6 tracking-tighter uppercase">전시 목록</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-8 md:gap-y-16">
              {exhibitions.map((exhibition) => (
                <div key={exhibition.id} className="group cursor-pointer" onClick={() => setSelectedExhibition(exhibition)}>
                  <div className={`relative ${posterAspectClass} overflow-hidden bg-neutral-100 mb-2 md:mb-6 rounded-lg md:rounded-xl shadow-sm`}>
                    <img src={exhibition.images[0]} alt={exhibition.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <h4 className="text-xs sm:text-sm md:text-lg font-bold text-neutral-900 mb-1 md:mb-2 line-clamp-2 leading-snug whitespace-pre-line">{exhibition.title}</h4>
                  <p className="text-[10px] md:text-xs text-neutral-400 font-medium">{exhibition.period}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Exhibition Detail Modal */}
      {selectedExhibition && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-md" onClick={() => setSelectedExhibition(null)}></div>
          <div className="relative bg-white w-full max-w-5xl h-[95vh] md:h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedExhibition(null)} className="absolute top-6 right-6 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm">
              <X size={24} />
            </button>
            
            {/* Gallery Section - Fixed Height container for images */}
            <div className="w-full md:w-2/5 bg-neutral-100 flex flex-col h-1/2 md:h-full">
              <div className="relative flex-1 bg-neutral-200 group overflow-hidden p-4 flex items-center justify-center">
                <img 
                  key={currentImageIndex}
                  src={selectedExhibition.images[currentImageIndex]} 
                  alt={`${selectedExhibition.title} ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/90 hover:text-black rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/90 hover:text-black rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Counter Label */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-[10px] font-bold rounded-full backdrop-blur-md">
                  {currentImageIndex + 1} / {selectedExhibition.images.length}
                </div>
              </div>

              {/* Thumbnail List */}
              <div className="h-24 md:h-28 bg-white border-t border-neutral-100 p-3 overflow-x-auto">
                <div className="flex gap-2 h-full">
                  {selectedExhibition.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative flex-shrink-0 h-full aspect-square rounded-lg overflow-hidden transition-all border-2 ${
                        currentImageIndex === idx ? 'border-red-500 scale-95' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Content Section - Fixed layout */}
            <div className="w-full md:w-3/5 p-8 md:p-14 bg-white overflow-y-auto h-1/2 md:h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-white text-[10px] font-black rounded uppercase tracking-tighter ${selectedExhibition.statusKey === 'current' ? 'bg-blue-600' : 'bg-neutral-900'}`}>
                  {selectedExhibition.status}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-neutral-900 mb-8 leading-tight tracking-tighter whitespace-pre-line">
                {selectedExhibition.title}
              </h3>
              
              <div className="space-y-8 text-neutral-600">
                <p className="whitespace-pre-line leading-relaxed text-base md:text-lg border-l-2 border-neutral-100 pl-6 italic">
                  {selectedExhibition.description}
                </p>
                
                <div className="pt-8 grid grid-cols-1 gap-5 text-sm md:text-base border-t border-neutral-100">
                  <div className="flex items-start">
                    <span className="w-24 shrink-0 font-bold text-neutral-900 flex items-center uppercase text-[11px] tracking-widest"><Calendar size={14} className="mr-2" /> Period</span>
                    <span className="text-neutral-500 font-medium">{selectedExhibition.period}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 shrink-0 font-bold text-neutral-900 flex items-center uppercase text-[11px] tracking-widest"><MapPin size={14} className="mr-2" /> Venue</span>
                    <span className="text-neutral-500 font-medium">{selectedExhibition.location}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 shrink-0 font-bold text-neutral-900 flex items-center uppercase text-[11px] tracking-widest"><Tag size={14} className="mr-2" /> Genre</span>
                    <span className="text-neutral-500 font-medium">{selectedExhibition.genre}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 shrink-0 font-bold text-neutral-900 flex items-center uppercase text-[11px] tracking-widest"><User size={14} className="mr-2" /> Artists</span>
                    <span className="text-neutral-500 font-medium">{selectedExhibition.artists}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <button onClick={() => setSelectedExhibition(null)} className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-lg active:scale-95">확인</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Space Detail Modal */}
      {isSpaceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-md" onClick={() => setIsSpaceModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-5xl h-[95vh] md:h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsSpaceModalOpen(false)} className="absolute top-6 right-6 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm">
              <X size={24} />
            </button>
            
            {/* Gallery Section */}
            <div className="w-full md:w-2/5 bg-neutral-100 flex flex-col h-1/2 md:h-full">
              <div className="relative flex-1 bg-neutral-200 group overflow-hidden p-4 flex items-center justify-center">
                <img 
                  key={currentSpaceImageIndex}
                  src={spaceImages[currentSpaceImageIndex]} 
                  alt={`전시실 내부 ${currentSpaceImageIndex + 1}`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={handlePrevSpaceImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/90 hover:text-black rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNextSpaceImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/90 hover:text-black rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Counter Label */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-[10px] font-bold rounded-full backdrop-blur-md">
                  {currentSpaceImageIndex + 1} / {spaceImages.length}
                </div>
              </div>

              {/* Thumbnail List */}
              <div className="h-24 md:h-28 bg-white border-t border-neutral-100 p-3 overflow-x-auto">
                <div className="flex gap-2 h-full">
                  {spaceImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSpaceImageIndex(idx)}
                      className={`relative flex-shrink-0 h-full aspect-square rounded-lg overflow-hidden transition-all border-2 ${
                        currentSpaceImageIndex === idx ? 'border-red-500 scale-95' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="w-full md:w-3/5 p-8 md:p-14 bg-white overflow-y-auto h-1/2 md:h-full flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-black text-neutral-900 mb-8 leading-tight tracking-tighter">
                전시실 내부
              </h3>
              
              <div className="space-y-8 text-neutral-600">
                <p className="whitespace-pre-line leading-relaxed text-base md:text-lg border-l-2 border-neutral-100 pl-6 italic">
                  전주현대미술관의 전시 공간입니다.
                </p>
                
                <div className="pt-8 grid grid-cols-1 gap-5 text-sm md:text-base border-t border-neutral-100">
                  <div className="flex items-start">
                    <span className="w-24 shrink-0 font-bold text-neutral-900 flex items-center uppercase text-[11px] tracking-widest"><MapPin size={14} className="mr-2" /> Space</span>
                    <span className="text-neutral-500 font-medium">제1전시실, 제2전시실</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <button onClick={() => setIsSpaceModalOpen(false)} className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-lg active:scale-95">확인</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visit Info Section */}
      {view === 'home' && (
        <section id="visit" className="py-12 md:py-24 bg-neutral-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
              <div>
                <h3 className="text-2xl md:text-4xl font-black mb-6 md:mb-12 uppercase tracking-tighter">Information</h3>
                <div className="space-y-6 md:space-y-12 text-neutral-400 text-sm md:text-base">
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-3 text-white">관람 시간</h4>
                    <p>화요일 - 일요일 11:00 ~ 17:30</p>
                    <p className="text-neutral-600 mt-1 md:mt-2">매주 월요일 휴관</p>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-3 text-white">관람료</h4>
                    <p>성인: 5,000원 / 초,중,고: 3,000원 / 아동: 무료</p>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-3 text-white">오시는 길</h4>
                    <p>전북특별자치도 전주시 완산구 풍남문2길 98-1</p>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-3 text-white">문의</h4>
                    <p>063-284-0777</p>
                    <p>jemamuseum@naver.com</p>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-800 rounded-2xl md:rounded-[2.5rem] overflow-hidden aspect-square border border-neutral-700 shadow-2xl">
                  <iframe 
                    title="전주현대미술관 지도"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.442483753946!2d127.1442212!3d35.8136179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35702591fd883e1f%3A0x5ab710535c6755a7!2z7KCE7KO87ZiE64yA66-47Iig6rSA!5e0!3m2!1sko!2skr!4v1774419367733!5m2!1sko!2skr" 
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="text-3xl font-black text-neutral-900 mb-2 tracking-tighter uppercase">전주현대미술관 JeMA</h2>
              <p className="text-[10px] text-neutral-300 uppercase tracking-[0.4em] font-black">Jeonju Museum of Contemporary Art</p>
            </div>
            <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest">© 2026 JeonjuMOCA. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
