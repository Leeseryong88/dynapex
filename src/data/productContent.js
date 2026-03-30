// PPT 슬라이드 텍스트 + 발표자 노트 심층 분석 기반 제품 상세 정보
// 각 제품은 PPT 슬라이드별 섹션으로 구성되며, 노트에서 추출한 임상적 맥락과 근거 포함

export const productContent = {
  gbm: {
    name: 'DYNAPEX BT',
    nameKr: 'DYNAPEX BT',
    subtitle: 'Brain Tumor',
    subtitleKr: 'Brain Tumor',
    descEn: 'Multiparametric physiologic MRI-based habitat analysis to characterize spatiotemporal tumor heterogeneity in glioblastoma.',
    descKr: 'Multiparametric physiologic MRI 기반 Habitat 분석으로 교모세포종의 시공간적 종양 이질성을 정량화합니다.',
    specs: [
      { value: '< 3 min', label: 'Per-case processing', labelKr: '건당 분석 시간' },
      { value: 'RANO 2.0', label: 'Response criteria', labelKr: '반응 평가 기준' },
      { value: '3D Volumetric', label: 'nnU-Net segmentation', labelKr: 'nnU-Net 분할' },
      { value: 'Zero-Click', label: 'PACS auto-integration', labelKr: 'PACS 자동 연동' },
    ],
    // ── PPT 슬라이드별 섹션 ──
    sections: [
      {
        // Slide 6: 종양 자동 분할 및 수술 계획
        id: 'segmentation',
        title: 'Tumor Auto-Segmentation & Surgical Planning',
        titleKr: '종양 자동 분할 및 수술 계획 수립',
        required: ['T1CE', 'FLAIR'],
        descEn: 'nnU-Net-based 3D segmentation automatically classifies glioblastoma into Necrosis, Enhancing Tumor, Non-Enhancing Tumor, and Edema — quantifying each component\'s volume.\nFor pre-surgical planning and post-surgical residual assessment.',
        descKr: 'nnU-Net 기반 3D segmentation으로 교모세포종을 괴사, 조영증강 종양, 비조영증강 종양, 부종으로 자동 분류하고 각 구성 요소의 체적을 정량화합니다.\n수술 전 계획 수립과 수술 후 잔존 종양 평가에 활용됩니다.',
        images: [
          { src: '/images/ppt/image19.jpeg', label: 'T1CE Brain MRI — GBM Tumor', labelKr: 'T1CE 뇌 MRI — 교모세포종', equalRow: true },
          { src: '/images/ppt/image20.jpeg', label: 'AI Tumor Segmentation Overlay', labelKr: 'AI 종양 segmentation overlay', equalRow: true },
          { src: '/images/ppt/image21.png', label: 'Neuro Navigation Integration', labelKr: 'Neuro navigation 연동', equalRow: true, flex: 1.8 },
        ],
        keyPoints: [
          { en: 'Necrosis · Enhancing Tumor · Edema auto-classification', kr: '괴사·조영증강 종양·부종 자동 분류' },
          { en: '3D visualization for Neuro Navigation integration', kr: '신경 내비게이션 연동을 위한 3D 시각화' },
          { en: 'Post-surgical subtraction: CET1 – NET1 voxelwise calculation', kr: '수술 후 감산 분석: CET1 – NET1 voxel 단위 계산' },
          { en: 'Extent of Resection (EoR) objective assessment', kr: '절제 범위(EoR) 객관적 평가' },
        ],
        legend: [
          { color: '#e53e3e', label: 'Necrosis', labelKr: 'Necrosis' },
          { color: '#38c172', label: 'Enhancing Tumor', labelKr: 'Enhancing Tumor' },
          { color: '#4299e1', label: 'Non-Enhancing / Edema', labelKr: 'Non-Enhancing / Edema' },
        ],
      },
      {
        // Slide 7: 시계열 체적 분석
        id: 'longitudinal',
        title: 'Longitudinal Volume Tracking',
        titleKr: '수술 전후 종양 volume 추적 관찰',
        descEn: 'Multi-timepoint MRI auto-registration tracks tumor volume changes in a unified coordinate space.\nRANO 2.0 criteria automatically classifies response as Complete Response, Partial Response, Stable Disease, or Progressive Disease.',
        descKr: 'Multi-timepoint MRI 자동 정합으로 동일 좌표계에서 종양 체적 변화를 추적합니다.\nRANO 2.0 기준에 따라 완전 반응, 부분 반응, 안정 병변, 진행성 병변으로 자동 분류합니다.',
        images: [
          { src: '/images/ppt/image23.png', label: 'Pre-op Tumor Segmentation (NCR+ET+ED)', labelKr: '수술 전 종양 segmentation (NCR+ET+ED)' },
          { src: '/images/ppt/image24.png', label: 'Post-op Residual Tumor Detection', labelKr: '수술 후 잔존 종양 검출' },
          { src: '/images/ppt/image25.png', label: 'Longitudinal Volume Tracking', labelKr: 'Volume 추적 관찰' },
          { src: '/images/ppt/image26.png', label: 'RANO Volumetric Report — Decrease vs Increase', labelKr: 'RANO volumetric report', equalRow: true },
          { src: '/images/ppt/image27.jpeg', label: 'Sagittal Diameter Measurement (Max + Perpendicular)', labelKr: 'Sagittal 직경 측정 (최대 + 수직)', equalRow: true },
        ],
        keyPoints: [
          { en: 'Multi-timepoint auto-registration in unified coordinate space', kr: '다중 시점 MRI 자동 정합 — 동일 좌표계 기반' },
          { en: 'RANO 2.0: Maximum + Perpendicular Diameter auto-measurement', kr: 'RANO 2.0: 최대 및 수직 직경 자동 측정' },
          { en: 'Color-coded tracking: New · Increase · Decrease · Stable', kr: '색상 구분 추적: 신규·증가·감소·안정' },
          { en: 'Enhancing & Non-enhancing volumes tracked independently', kr: '조영증강·비조영증강 체적 독립 추적' },
        ],
      },
      {
        // Slide 8: Habitat Analysis — CORE DIFFERENTIATOR
        id: 'habitat',
        title: 'Tumor Habitat Analysis',
        titleKr: 'Multiparametric MRI 기반 종양 미세환경 Habitat 분석',
        badge: { en: 'DYNAPEX Unique Technology', kr: 'DYNAPEX 고유 기술' },
        required: ['T1CE', 'FLAIR', 'rCBV', 'ADC'],
        descEn: 'The core differentiator of DYNAPEX — rCBV + ADC Voxelwise K-means Clustering classifies the tumor microenvironment into three biological habitats.\nHabitat composition changes 3–6 months BEFORE tumor size change, enabling early detection of pseudoprogression vs recurrence.',
        descKr: 'DYNAPEX의 핵심 차별화 기술 — rCBV + ADC voxelwise K-means clustering으로 종양 미세환경을 3가지 생물학적 habitat으로 분류합니다.\nHabitat 구성 비율의 변화가 종양 크기 변화보다 3~6개월 앞서 나타나, 위진행과 재발을 조기에 감별할 수 있습니다.',
        inputImages: [
          { src: '/images/ppt/image28.jpeg', label: 'T1CE', labelKr: 'T1CE' },
          { src: '/images/ppt/image29.jpeg', label: 'FLAIR', labelKr: 'FLAIR' },
          { src: '/images/ppt/image30.jpeg', label: 'rCBV', labelKr: 'rCBV' },
          { src: '/images/ppt/image31.png', label: 'DSC Perfusion — rCBV Heatmap', labelKr: 'DSC perfusion — rCBV heatmap' },
        ],
        outputImages: [
          { src: '/images/ppt/image32.jpeg', label: 'Habitat Segmentation Output', labelKr: 'Habitat segmentation 결과' },
          { src: '/images/ppt/image33.png', label: 'K-means Clustering Chart', labelKr: 'K-means clustering chart', equalHeight: true },
        ],
        workflow: [
          { step: 1, en: 'Tumor Auto-Segmentation', kr: '종양 auto-segmentation' },
          { step: 2, en: 'Habitat Sub-Segmentation (K-means)', kr: 'Habitat sub-segmentation (K-means)' },
          { step: 3, en: 'SMR (Supramarginal Resection) Planning', kr: 'SMR (supramarginal resection) planning' },
        ],
        legend: [
          { color: '#ff4d5f', label: 'Hypervascular Cellular', detail: 'High rCBV, Low ADC — Most aggressive', labelKr: 'Hypervascular Cellular', detailKr: '높은 rCBV, 낮은 ADC — 가장 공격적인 영역' },
          { color: '#2adf78', label: 'Hypovascular Cellular', detail: 'Low rCBV, Low ADC — Highest spatial correlation with recurrence site', labelKr: 'Hypovascular Cellular', detailKr: '낮은 rCBV, 낮은 ADC — 재발 부위와 가장 높은 공간적 상관성' },
          { color: '#6aa9ff', label: 'Nonviable Tissue', detail: 'Low rCBV, High ADC — Necrotic/destroyed', labelKr: 'Nonviable Tissue', detailKr: '낮은 rCBV, 높은 ADC — 괴사·파괴 조직' },
        ],
        evidence: {
          en: 'Prospective study (Neuro-Oncology 2025): Hazard Ratio 10.02 for outcome prediction. Habitat composition ratio changes 3–6 months before tumor size change — detecting biological shifts invisible to RANO criteria.',
          kr: '전향적 연구 (Neuro-Oncology 2025): 예후 예측 Hazard Ratio 10.02. 종양 크기 변화보다 3~6개월 앞서 Habitat 구성 비율이 선행 변화하며, RANO 기준만으로는 포착할 수 없는 생물학적 변화를 조기에 감지합니다.',
        },
      },
    ],
    publications: [],
    dre: {
      title: 'DYNAPEX Report Engine (DRE)',
      titleKr: 'DYNAPEX Report Engine (DRE)',
      status: 'Under Development',
      statusKr: 'Under Development',
      descEn: 'LLM-based Planner-first architecture automatically generates structured preliminary reports (FINDINGS + IMPRESSION) from the AI analysis pipeline.',
      descKr: 'LLM 기반 Planner-first 아키텍처가 AI 분석 파이프라인 결과로부터 구조화된 판독문 초안(FINDINGS + IMPRESSION)을 자동 생성합니다.',
      sampleFindings: [
        'Enhancing mass in Lt. frontal lobe, max diameter 3.2 cm (prior 3.8 cm) — decreased.',
        'Non-enhancing T2/FLAIR lesion in Lt. parietal white matter, max 2.1 cm — stable.',
        'Enhancing nodule in Rt. temporal lobe, max 0.8 cm — newly developed.',
      ],
      sampleImpression: [
        'Decreased primary enhancing lesion (3.2 cm → 3.8 cm); partial response per RANO.',
        'New 0.8 cm Rt. temporal enhancing nodule; recommend follow-up.',
      ],
      advantages: [
        {
          icon: '⚡',
          title: 'Instant Draft Generation',
          titleKr: '즉시 초안 생성',
          desc: 'Structured report generated in seconds from quantitative analysis results.',
          descKr: '정량 분석 결과로부터 수 초 만에 구조화된 판독문 초안을 생성합니다.',
        },
        {
          icon: '📐',
          title: 'Consistent Structure',
          titleKr: '일관된 구조',
          desc: 'Standardized FINDINGS + IMPRESSION format ensures uniform reporting quality.',
          descKr: '표준화된 FINDINGS + IMPRESSION 형식으로 일관된 판독 품질을 보장합니다.',
        },
        {
          icon: '🔗',
          title: 'Pipeline Integration',
          titleKr: '파이프라인 연동',
          desc: 'Directly references detection, segmentation, and volumetric tracking data.',
          descKr: '검출, 분할, 체적 추적 데이터를 직접 참조하여 판독문을 작성합니다.',
        },
        {
          icon: '✏️',
          title: 'Radiologist-in-the-Loop (QC)',
          titleKr: '영상의학과 전문의 검수',
          desc: 'AI draft serves as a starting point — final report is always reviewed and approved by the radiologist.',
          descKr: 'AI 초안은 출발점이며, 최종 판독문은 반드시 영상의학과 전문의가 검수·승인합니다.',
        },
      ],
    },
  },

  mets: {
    name: 'DYNAPEX METS',
    nameKr: 'DYNAPEX METS',
    subtitle: 'Brain Metastasis',
    subtitleKr: '전이성 뇌종양',
    descEn: 'End-to-end pipeline for brain metastasis detection, volumetric tracking, and structural habitat analysis. Brain metastasis patients outnumber primary brain tumor patients by 10–50×, making accurate AI-assisted detection critical for clinical workflow.',
    descKr: '뇌전이 검출부터 체적 추적, 구조적 habitat 분석까지 아우르는 통합 파이프라인입니다. 뇌전이 환자는 원발성 뇌종양의 10~50배에 달해, AI 보조 검출이 임상 현장에서 필수적입니다.',
    specs: [
      { value: '< 2 min', label: 'Processing time', labelKr: '처리 시간' },
      { value: 'RANO-BM', label: 'Response criteria', labelKr: '치료 반응 평가 기준' },
      { value: 'Sub-cm', label: 'Micro-lesion detection', labelKr: '미세 병변 검출' },
      { value: 'End-to-End', label: 'Detection → Tracking → Habitat', labelKr: 'Detection → Tracking → Habitat' },
    ],
    sections: [
      {
        // Slide 9: 자동 분할 · 정량 추적 + 종적 추적
        id: 'detection',
        title: 'AI Detection & Longitudinal Tracking',
        titleKr: '뇌전이 자동 검출 · Volume 추적 관찰',
        required: ['T1CE (WB+BB)', 'or T1CE WB', 'or T1CE BB'],
        descEn: 'Sub-centimeter enhancing lesion auto-detection with false-positive minimization. Grid Layout Viewer enables side-by-side comparison of original vs AI overlay.\nLongitudinal volume tracking dashboard for treatment response monitoring across follow-ups.',
        descKr: '1cm 미만의 조영증강 병변까지 자동 검출하면서 위양성을 최소화합니다. Grid Layout Viewer로 원본과 AI overlay를 나란히 비교할 수 있습니다.\n체적 추적 대시보드를 통해 추적 관찰 시점별 치료 반응을 모니터링합니다.',
        images: [
          { src: '/images/ppt/image34.png', label: 'Brain Metastasis Auto-Detection', labelKr: '뇌전이 자동 검출', equalRow: true },
          { src: '/images/ppt/image35.png', label: 'Bounding Box vs Track Over — Lesion Tracking', labelKr: 'Bounding Box vs Track Over — 병변 추적', equalRow: true },
          { src: '/images/ppt/image36.png', label: 'DYNAPEX-METS — Longitudinal Tracking Dashboard', labelKr: 'DYNAPEX-METS — 추적 관찰 dashboard', equalRow: true },
        ],
        keyPoints: [
          { en: '3 input modes: WB+BB SET / BB ONLY / WB ONLY', kr: '3가지 입력 모드: WB+BB SET / BB ONLY / WB ONLY' },
          { en: 'Grid Layout Viewer: Original vs AI Overlay comparison', kr: 'Grid Layout Viewer: 원본과 AI overlay 나란히 비교' },
          { en: 'Anatomical Minimap: Whole-brain lesion localization', kr: 'Anatomical Minimap: 전뇌 병변 위치 시각화' },
          { en: 'Sub-centimeter enhancing lesion detection — preventing missed micro-metastases', kr: '1cm 미만 조영증강 병변 검출 — 미세 전이 누락 방지' },
          { en: 'Longitudinal volume tracking across follow-up timepoints', kr: '추적 관찰 시점별 체적 추적' },
        ],
      },
      {
        // Slide 10: Structural Habitat (독립 섹션)
        id: 'habitat',
        title: 'Structural Habitat Analysis',
        titleKr: 'Structure Habitat 분석',
        required: ['T1CE', 'T2'],
        descEn: 'T1CE + T2 based 3-Habitat classification enables non-invasive differentiation of radiation necrosis vs tumor recurrence after SRS\n— a frequent clinical dilemma where conventional imaging alone is insufficient.',
        descKr: 'T1CE + T2 기반 3-Habitat 분류로 정위방사선수술(SRS) 후 방사선 괴사와 종양 재발을 비침습적으로 감별합니다.\n— 기존 영상만으로는 구분이 어려운, 임상에서 자주 마주치는 진단적 난제를 해결합니다.',
        images: [
          { src: '/images/ppt/image37.png', label: 'T1CE Metastasis Close-up', labelKr: 'T1CE 전이 병변 확대' },
          { src: '/images/ppt/image38.png', label: 'T2 Metastasis Close-up', labelKr: 'T2 전이 병변 확대' },
          { src: '/images/ppt/image39.png', label: 'Structural Habitat Overlay (3-Habitat)', labelKr: 'Structure Habitat overlay (3-Habitat)' },
          { src: '/images/ppt/image40.png', label: 'Follow-up Perfusion & Habitat Comparison', labelKr: 'Follow-up perfusion & Habitat 비교', large: true },
        ],
        legend: [
          { color: '#ff4d5f', label: 'Enhancing Habitat', labelKr: 'Enhancing Habitat' },
          { color: '#6aa9ff', label: 'Solid Low-Enhancing', labelKr: 'Solid Low-Enhancing' },
          { color: '#999', label: 'Nonviable Tissue', labelKr: 'Nonviable Tissue' },
        ],
        evidence: {
          en: 'T1CE + T2 Habitat ratio changes provide non-invasive differentiation of radiation necrosis vs recurrence post-SRS. Validated in Korean Journal of Radiology 2023.',
          kr: 'T1CE + T2 Habitat 비율 변화를 통해 SRS 후 방사선 괴사와 재발을 비침습적으로 감별합니다. Korean Journal of Radiology 2023에서 검증되었습니다.',
        },
      },
    ],
    publications: [],
    dre: {
      title: 'DYNAPEX Report Engine (DRE)',
      titleKr: 'DYNAPEX Report Engine (DRE)',
      status: 'Under Development',
      statusKr: 'Under Development',
      descEn: 'LLM-based Planner-first architecture automatically generates structured preliminary reports (FINDINGS + IMPRESSION) from the AI detection and tracking pipeline.',
      descKr: 'LLM 기반 Planner-first 아키텍처가 AI 검출 및 추적 파이프라인 결과로부터 구조화된 판독문 초안(FINDINGS + IMPRESSION)을 자동 생성합니다.',
      sampleFindings: [
        '25 enhancing lesions across 9 regions (prior: 8 in 5 regions).',
        'Largest lesion: Lt. Frontal, max 1.1 cm (156 mm³) — stable.',
        'Rt. Frontal lesion, max 3.5 mm — increased from prior 2.1 mm.',
        'Lt. Temporal lesion, max 5.7 mm — newly developed.',
      ],
      sampleImpression: [
        'Mixed response per RANO-BM: 2 increased, 3 decreased, 17 new lesions.',
        'Total burden 469 mm³ across 9 regions; largest 1.1 cm (stable).',
      ],
      advantages: [
        {
          icon: '⚡',
          title: 'Instant Draft Generation',
          titleKr: '즉시 초안 생성',
          desc: 'Structured report generated in seconds from quantitative analysis results.',
          descKr: '정량 분석 결과로부터 수 초 만에 구조화된 판독문 초안을 생성합니다.',
        },
        {
          icon: '📐',
          title: 'Consistent Structure',
          titleKr: '일관된 구조',
          desc: 'Standardized FINDINGS + IMPRESSION format ensures uniform reporting quality.',
          descKr: '표준화된 FINDINGS + IMPRESSION 형식으로 일관된 판독 품질을 보장합니다.',
        },
        {
          icon: '🔗',
          title: 'Pipeline Integration',
          titleKr: '파이프라인 연동',
          desc: 'Directly references detection, segmentation, and volumetric tracking data.',
          descKr: '검출, 분할, 체적 추적 데이터를 직접 참조하여 판독문을 작성합니다.',
        },
        {
          icon: '✏️',
          title: 'Radiologist-in-the-Loop (QC)',
          titleKr: '영상의학과 전문의 검수',
          desc: 'AI draft serves as a starting point — final report is always reviewed and approved by the radiologist.',
          descKr: 'AI 초안은 출발점이며, 최종 판독문은 반드시 영상의학과 전문의가 검수·승인합니다.',
        },
      ],
    },
  },

  aira: {
    name: 'DYNAPEX AD',
    nameKr: 'DYNAPEX AD',
    subtitle: 'Alzheimer\'s Disease & Neurodegeneration',
    subtitleKr: '알츠하이머 및 신경퇴행성 질환',
    descEn: 'Comprehensive neurodegenerative disease analysis: Brain volumetry (FastSurfer, 95 structures), WMH/CMB quantification, BBB permeability mapping, and ARIA monitoring for anti-amyloid antibody therapy (Lecanemab, Donanemab).',
    descKr: '신경퇴행성 질환 종합 분석 플랫폼입니다. 뇌 체적 분석(FastSurfer, 95개 구조), WMH/CMB 정량화, 혈뇌장벽 투과도 매핑, 항아밀로이드 항체 치료(Lecanemab, Donanemab)에 따른 ARIA 모니터링까지 포괄합니다.',
    specs: [
      { value: '< 3 min', label: 'GPU processing', labelKr: 'GPU 처리 시간' },
      { value: '95', label: 'Brain structures', labelKr: '뇌 구조물 수' },
      { value: 'MARS', label: 'CMB classification', labelKr: 'CMB 분류 체계' },
      { value: 'ARIA', label: 'Anti-amyloid monitoring', labelKr: '항아밀로이드 모니터링' },
    ],
    sections: [
      {
        // Slide 11a: Brain Volumetry
        id: 'volumetry',
        title: 'Brain Volumetry',
        titleKr: 'Brain Volumetry',
        required: ['T1'],
        descEn: 'FastSurfer deep learning segments the whole brain into 95 anatomical structures from T1WI input alone in under 3 minutes on GPU.\nIncludes proprietary Choroid Plexus segmentation for BCSFB function and Glymphatic pathway assessment.',
        descKr: 'FastSurfer 딥러닝이 T1WI 입력만으로 전뇌를 95개 해부학적 구조로 분할합니다(GPU 기준 3분 이내).\n자체 개발한 맥락막총(choroid plexus) 분할 기술로 BCSFB 기능 및 글림프계 경로 평가를 지원합니다.',
        images: [
          { src: '/images/ppt/image41.png', label: 'FastSurfer — 95 Structure Segmentation', labelKr: 'FastSurfer — 95 구조 segmentation' },
          { src: '/images/ppt/image42.png', label: 'Subcortical Nuclei Segmentation', labelKr: 'Subcortical nuclei segmentation' },
          { src: '/images/ppt/image43.png', label: 'Hippocampus & Amygdala Volume', labelKr: 'Hippocampus & amygdala volume' },
        ],
        keyPoints: [
          { en: 'Hippocampal volume & MTA scale auto-calculation', kr: '해마 체적 및 MTA 등급 자동 산출' },
          { en: 'Choroid Plexus: CP volume + ICV correction → BCSFB function', kr: '맥락막총: CP 체적 + ICV 보정 → BCSFB 기능 평가' },
        ],
      },
      {
        // Slide 11b: Multi-parametric MRI
        id: 'multiparametric',
        title: 'Multi-parametric MRI Analysis',
        titleKr: 'Multiparametric MRI 분석',
        required: ['T1', 'DCE'],
        descEn: 'QSM (Quantitative Susceptibility Mapping) for iron deposition and neuroinflammation assessment, plus DCE-MRI K-trans mapping for blood-brain barrier permeability.\n— A key biomarker for MCI to AD conversion prediction.',
        descKr: 'QSM(정량적 자화율 매핑)으로 철 침착 및 신경염증을 평가하고, DCE-MRI K-trans 매핑으로 혈뇌장벽 투과도를 정량화합니다.\n— 경도인지장애(MCI)에서 알츠하이머 전환을 예측하는 핵심 바이오마커입니다.',
        images: [
          { src: '/images/ppt/image46.png', label: '3DT1-Coronal View', labelKr: '3DT1 — Coronal view' },
          { src: '/images/ppt/image44.png', label: 'DCE K-trans — BBB Permeability', labelKr: 'DCE K-trans — BBB permeability' },
          { src: '/images/ppt/image45.png', label: 'Choi JD et al. Radiology 2022;305(3):635-645', labelKr: 'Choi JD et al. Radiology 2022;305(3):635-645', large: true },
        ],
        keyPoints: [
          { en: 'K-trans: BBB permeability for MCI → AD conversion prediction', kr: 'K-trans: 혈뇌장벽 투과도 기반 MCI → AD 전환 예측' },
          { en: 'QSM: Iron deposition, neuroinflammation assessment', kr: 'QSM: 철 침착·신경염증 정량 평가' },
        ],
      },
      {
        // Slide 12: WMH Segmentation & Tracking
        id: 'wmh',
        title: 'WMH Segmentation & Longitudinal Tracking',
        titleKr: 'WMH Segmentation 및 추적 관찰',
        required: ['FLAIR'],
        descEn: 'Quantitative CSVD (Cerebral Small Vessel Disease) burden assessment.\nFLAIR-based WMH auto-segmentation with anatomical localization, Fazekas scoring, and Co-registration-based longitudinal tracking of new and enlarging lesions.',
        descKr: '뇌소혈관 질환(CSVD) 부담을 정량적으로 평가합니다.\nFLAIR 기반 WMH 자동 분할, 해부학적 위치 분류, Fazekas 등급 자동 산출, 정합 기반 신규·확대 병변 종적 추적을 제공합니다.',
        images: [
          { src: '/images/ppt/image48.png', label: 'FLAIR Input — White Matter Hyperintensities', labelKr: 'FLAIR 입력 — WMH', equalRow: true },
          { src: '/images/ppt/image49.png', label: 'WMH Auto-Segmentation Overlay', labelKr: 'WMH auto-segmentation overlay', equalRow: true },
          { src: '/images/ppt/image51.png', label: 'Longitudinal WMH Progression', labelKr: 'WMH 추적 관찰 변화', equalRow: true },
          { src: '/images/ppt/image50.png', label: 'Volume Change Report — Periventricular & Deep WM', labelKr: 'Volume change report — Periventricular & Deep WM', large: true, maxHeight: 336 },
        ],
        keyPoints: [
          { en: 'Localization: Periventricular / Deep WM / Juxtacortical', kr: '해부학적 위치 분류: 뇌실 주위 / 심부 백질 / 피질 인접부' },
          { en: 'Fazekas scale auto-estimation', kr: 'Fazekas 등급 자동 산출' },
          { en: 'Co-registration: New WMH + enlargement of existing WMH auto-tracked', kr: '영상 정합: 신규 WMH 및 기존 WMH 확대 자동 추적' },
          { en: 'Grid Layout Viewer: FLAIR original vs WMH overlay side-by-side', kr: 'Grid Layout Viewer: FLAIR 원본과 WMH overlay 나란히 비교' },
        ],
      },
      {
        // Slide 13: CMB Detection & MARS
        id: 'cmb',
        title: 'CMB Detection & MARS Classification',
        titleKr: 'CMB 자동 검출 · MARS 해부학적 분류',
        required: ['SWI Phase', 'SWI Magnitude'],
        descEn: 'Cerebral Microbleeds (CMB) auto-detection with MARS anatomical classification.\nCritical for anti-amyloid antibody therapy (Lecanemab, Donanemab) where ARIA-H monitoring is mandatory. Lobar-dominant CMBs suggest CAA; Deep-dominant suggest hypertensive microangiopathy — fundamentally different treatment approaches.',
        descKr: '뇌미세출혈(CMB)을 자동 검출하고 MARS 체계에 따라 해부학적으로 분류합니다.\nLecanemab/Donanemab 등 항아밀로이드 항체 치료 시 ARIA-H 모니터링이 필수적입니다. 엽 우세형은 CAA를, 심부 우세형은 고혈압성 미세혈관병증을 시사하며, 치료 방침이 근본적으로 달라집니다.',
        images: [
          { src: '/images/ppt/image53.png', label: 'SWI Input — Raw', labelKr: 'SWI 입력 — 원본', equalRow: true },
          { src: '/images/ppt/image54.png', label: 'CMB AI Detection + Minimap', labelKr: 'CMB AI 검출 + 미니맵', equalRow: true },
          { src: '/images/ppt/image56.png', label: 'Longitudinal CMB Tracking', labelKr: 'CMB 종적 추적', equalRow: true },
          { src: '/images/ppt/image55.png', label: 'MARS Localization Report', labelKr: 'MARS 위치 분류 보고', large: true, maxHeight: 336 },
        ],
        legend: [
          { color: '#ff4d5f', label: 'Lobar', detail: 'Cortical/subcortical — CAA associated', labelKr: 'Lobar', detailKr: 'Cortical/subcortical — CAA 연관' },
          { color: '#6aa9ff', label: 'Deep', detail: 'Basal ganglia/thalamus — Hypertensive', labelKr: 'Deep', detailKr: 'Basal ganglia/thalamus — Hypertensive' },
          { color: '#2adf78', label: 'Infratentorial', detail: 'Cerebellum/brainstem', labelKr: 'Infratentorial', detailKr: 'Cerebellum/brainstem' },
        ],
        keyPoints: [
          { en: 'SWI Magnitude + Phase dual input', kr: 'SWI Magnitude + Phase dual input' },
          { en: 'Multi-timepoint SWI rigid registration → auto new/lost/changed classification', kr: '다중 시점 SWI 강체 정합 → 신규/소실/변화 자동 분류' },
          { en: 'Anticoagulant prescription decision support', kr: '항응고제 처방 의사결정 지원' },
          { en: 'ARIA-H monitoring for Lecanemab / Donanemab therapy', kr: 'Lecanemab / Donanemab 치료 시 ARIA-H 모니터링' },
        ],
      },
    ],
  },

  ms: {
    name: 'DYNAPEX MS',
    nameKr: 'DYNAPEX MS',
    subtitle: 'Multiple Sclerosis',
    subtitleKr: '다발성 경화증',
    descEn: 'Dual-modality MS analysis combining T2-FLAIR WML segmentation with QSM-based Paramagnetic Rim Lesion (PRL) detection.\n— The emerging biomarker for chronic active demyelination and PIRA prediction.',
    descKr: 'T2-FLAIR 기반 백질 병변 분할과 QSM 기반 상자성 테두리 병변(PRL) 검출을 결합한 이중 모달리티 다발성 경화증 분석입니다.\n— 만성 활동성 탈수초와 PIRA 예측을 위한 차세대 바이오마커를 제공합니다.',
    required: ['T2-FLAIR', 'QSM (multi-echo GRE)'],
    specs: [
      { value: 'FLAIR', label: 'WML segmentation', labelKr: 'WML segmentation' },
      { value: 'QSM', label: 'PRL detection', labelKr: 'PRL detection' },
      { value: 'McDonald', label: 'DIS criteria', labelKr: 'DIS criteria' },
      { value: 'NEDA-3', label: 'Disease monitoring', labelKr: 'Disease monitoring' },
    ],
    sections: [
      {
        // Slide 14-1: WML Segmentation
        id: 'wml',
        title: 'WML Segmentation & Longitudinal Tracking',
        titleKr: 'WML Segmentation 및 추적 관찰',
        required: ['T2-FLAIR'],
        descEn: 'T2-FLAIR WML segmentation with McDonald DIS criteria evaluation across 4 CNS regions, and NEDA-3 longitudinal tracking for disease activity monitoring.',
        descKr: 'T2-FLAIR 기반 백질 병변 분할과 McDonald DIS 기준 4개 CNS 영역 평가, 그리고 NEDA-3 종적 추적으로 질병 활성도를 모니터링합니다.',
        images: [
          { src: '/images/ppt/image57.jpeg', label: 'T2-FLAIR — MS White Matter Lesions', labelKr: 'T2-FLAIR — MS WML', equalRow: true },
          { src: '/images/ppt/image58.jpeg', label: 'WML Segmentation + McDonald DIS Localization', labelKr: 'WML segmentation + McDonald DIS 위치 분류', equalRow: true },
          { src: '/images/ppt/image59.png', label: 'Longitudinal WML Tracking Report (NEDA-3)', labelKr: 'WML 추적 관찰 report (NEDA-3)', equalRow: true },
        ],
        keyPoints: [
          { en: 'McDonald DIS: Periventricular / Deep WM / Juxtacortical / Infratentorial auto-classification', kr: 'McDonald DIS: 뇌실주위 / 심부백질 / 피질인접 / 천막하 자동 분류' },
          { en: 'NEDA-3: New/enlarged T2 lesion auto-comparison vs baseline', kr: 'NEDA-3: 신규·확대 T2 병변을 기저선 대비 자동 비교' },
        ],
      },
      {
        // Slide 14-2: QSM-based PRL Detection + QSM Pipeline
        id: 'prl',
        title: 'QSM-based PRL Detection',
        titleKr: 'QSM 기반 PRL Detection',
        required: ['Multi-echo GRE (≥4 echoes)'],
        descEn: 'QSM-based Paramagnetic Rim Lesion (PRL) detection following NAIMS 2024 Consensus.\nPRL ≥1 serves as MS diagnostic biomarker and predictor of chronic active lesion progression.\n— Four-stage QSM pipeline: VSHARP → BfrNet → dynaSTAR → xQSM.',
        descKr: 'QSM 기반 상자성 테두리 병변(PRL) 검출 — NAIMS 2024 Consensus 기준을 적용합니다.\nPRL이 1개 이상 존재하면 MS 진단 보조 바이오마커이자 만성 활동성 병변 진행 예측 인자로 활용됩니다.\n— 4단계 QSM 파이프라인: VSHARP → BfrNet → dynaSTAR → xQSM.',
        images: [
          { src: '/images/ppt/image61.png', label: 'QSM', labelKr: 'QSM', equalRow: true },
          { src: '/images/ppt/image60.jpeg', label: 'QSM-based PRL Detection', labelKr: 'QSM 기반 PRL Detection', equalRow: true },
        ],
        workflow: [
          { step: 1, en: 'VSHARP — Background field removal', kr: 'VSHARP — Background field removal' },
          { step: 2, en: 'BfrNet — AI-based displacement removal', kr: 'BfrNet — AI 기반 displacement removal' },
          { step: 3, en: 'dynaSTAR — iLSQR dipole inversion', kr: 'dynaSTAR — iLSQR dipole inversion' },
          { step: 4, en: 'xQSM — DL-based high-speed reconstruction', kr: 'xQSM — DL 기반 고속 reconstruction' },
        ],
        keyPoints: [
          { en: 'PRL criteria (NAIMS 2024): ≥2/3 contiguous paramagnetic rim, diameter ≥3mm, no enhancement', kr: 'PRL 기준 (NAIMS 2024): 2/3 이상 연속 상자성 테두리, 직경 ≥3mm, 조영증강 음성' },
          { en: 'PRL ≥1 → MS diagnostic adjunct + PIRA (Progression Independent of Relapse Activity) predictor', kr: 'PRL ≥1 → MS 진단 보조 + PIRA(재발 비의존성 진행) 예측 바이오마커' },
          { en: 'Positive χ = Paramagnetic (Iron, Hemosiderin) / Negative χ = Diamagnetic (Myelin, Calcification)', kr: '양(+) χ = 상자성(철, 헤모시데린) / 음(-) χ = 반자성(미엘린, 석회화)' },
        ],
      },
    ],
  },

  pd: {
    name: 'DYNAPEX PD',
    nameKr: 'DYNAPEX PD',
    subtitle: 'Parkinson\'s Disease',
    subtitleKr: '파킨슨병',
    descEn: 'Advanced susceptibility quantification and oxygen metabolism mapping platform for movement disorders.\nQSM pipeline (dynaSTAR + BfrNet), SMWI Nigrosome-1 visualization, and PET-less OEF/CMRO₂ estimation.',
    descKr: '운동 장애 질환을 위한 자화율 정량화 및 산소 대사 매핑 제품입니다.\nQSM 파이프라인(dynaSTAR + BfrNet), SMWI 기반 Nigrosome-1 시각화, PET 없이 OEF/CMRO₂를 추정할 수 있습니다.',
    required: ['Multi-echo GRE (≥4 echoes)', 'SWI (Magnitude + Phase)'],
    specs: [
      { value: 'QSM', label: 'Iron quantification', labelKr: 'Iron 정량화' },
      { value: 'SMWI', label: 'Nigrosome-1', labelKr: 'Nigrosome-1' },
      { value: 'dynaSTAR', label: 'Phase processing', labelKr: 'Phase processing' },
      { value: 'OEF', label: 'Oxygen metabolism (dev.)', labelKr: 'O₂ metabolism (개발 중)' },
    ],
    sections: [
      {
        // Slide 15-1: QSM + Nigrosome-1
        id: 'qsm',
        title: 'QSM Pipeline & Nigrosome-1 Visualization',
        titleKr: 'QSM Pipeline 및 Nigrosome-1 시각화',
        descEn: 'Four-stage QSM pipeline: VSHARP (background field removal) → BfrNet (AI-based displacement removal) → dynaSTAR (iLSQR dipole inversion) → xQSM (DL-based high-speed reconstruction).\nSMWI visualizes the Swallow Tail Sign — loss of SNpc Nigrosome-1 hyperintensity is the key PD imaging biomarker.',
        descKr: '4단계 QSM 파이프라인: VSHARP(배경 자기장 제거) → BfrNet(AI 기반 변위 제거) → dynaSTAR(iLSQR 쌍극자 역변환) → xQSM(딥러닝 기반 고속 재구성).\nSMWI로 Swallow Tail Sign을 시각화하며, 흑질 치밀부(SNpc) Nigrosome-1 고신호의 소실이 파킨슨병의 핵심 영상 바이오마커입니다.',
        images: [
          { src: '/images/ppt/image61.png', label: 'QSM — Basal Ganglia Iron Deposition', labelKr: 'QSM — Basal ganglia iron deposition', equalRow: true },
          { src: '/images/ppt/image62.jpeg', label: 'SMWI — Substantia Nigra (Swallow Tail Sign)', labelKr: 'SMWI — Substantia nigra (Swallow Tail Sign)', equalRow: true },
          { src: '/images/ppt/image64.jpeg', label: 'Standard SWI vs CLEAR-SWI Comparison', labelKr: 'Standard SWI vs CLEAR-SWI 비교', equalRow: true },
        ],
        workflow: [
          { step: 1, en: 'VSHARP — Background field removal', kr: 'VSHARP — Background field removal' },
          { step: 2, en: 'BfrNet — AI-based displacement removal', kr: 'BfrNet — AI 기반 displacement removal' },
          { step: 3, en: 'dynaSTAR — iLSQR dipole inversion', kr: 'dynaSTAR — iLSQR dipole inversion' },
          { step: 4, en: 'xQSM — DL-based high-speed reconstruction', kr: 'xQSM — DL 기반 고속 reconstruction' },
        ],
        keyPoints: [
          { en: 'Positive χ = Paramagnetic (Iron, Hemosiderin) / Negative χ = Diamagnetic (Myelin, Calcification)', kr: '양(+) χ = 상자성(철, 헤모시데린) / 음(-) χ = 반자성(미엘린, 석회화)' },
          { en: 'CLEAR-SWI: Signal dropout removal + B0/B1 inhomogeneity correction', kr: 'CLEAR-SWI: 신호 소실 제거 + B0/B1 불균일 보정' },
          { en: 'Swallow Tail Sign: SNpc Nigrosome-1 loss = PD biomarker', kr: 'Swallow Tail Sign: SNpc Nigrosome-1 소실 = 파킨슨병 바이오마커' },
        ],
      },
      {
        // Slide 15-2: OEF / O₂ Saturation / R2* — Under Development
        id: 'oef',
        title: 'OEF / O₂ Metabolism Mapping',
        titleKr: 'OEF / 산소 대사 Mapping',
        badge: { en: 'Under Development', kr: '개발 중' },
        descEn: 'PET-less non-invasive OEF (Oxygen Extraction Fraction) and CMRO₂ estimation from multi-echo GRE.\nR2* mapping enables quantitative oxygen saturation assessment without contrast injection or radiation exposure.',
        descKr: 'Multi-echo GRE 영상에서 PET 없이 비침습적으로 OEF(산소 추출 분율)와 CMRO₂를 추정합니다.\nR2* 매핑을 통해 조영제나 방사선 노출 없이도 조직 내 산소 포화도를 정량적으로 평가할 수 있습니다.',
        images: [
          { src: '/images/ppt/image63.png', label: 'OEF / O₂ Saturation / R2* Maps', labelKr: 'OEF / O₂ Saturation / R2* maps', large: true },
        ],
        keyPoints: [
          { en: 'OEF mapping: PET-less non-invasive CMRO₂ estimation', kr: 'OEF 매핑: PET 없이 비침습적 CMRO₂ 추정' },
          { en: 'R2* quantification for tissue oxygen saturation assessment', kr: 'R2* 정량화를 통한 조직 내 산소 포화도 평가' },
        ],
      },
    ],
  },

  stroke: {
    name: 'CERCARE STROKE',
    nameKr: 'CERCARE STROKE',
    subtitle: 'CT/MR Perfusion & Stroke',
    subtitleKr: 'CT/MR Perfusion & 뇌졸중',
    descEn: 'CT/MR perfusion analysis platform in partnership with Cercare Medical (Denmark).\nStandard + advanced perfusion maps including PET-equivalent OEF/CTH without PET.\nAutomated Core–Penumbra mismatch analysis for thrombectomy eligibility (DAWN/DEFUSE-3 criteria).',
    descKr: 'Cercare Medical(덴마크)과의 파트너십을 기반으로 한 CT/MR 관류 분석 제품입니다.\nPET 없이도 OEF/CTH를 포함한 표준 및 고급 관류 지도를 생성합니다.\nCore–Penumbra 불일치 자동 분석으로 혈전제거술 적응증을 판정합니다(DAWN/DEFUSE-3 기준).',
    required: ['CT Perfusion or MR DSC/DCE'],
    specs: [
      { value: 'Cercare', label: 'Denmark partnership', labelKr: '덴마크 파트너' },
      { value: 'CT/MR', label: 'Dual modality', labelKr: 'Dual modality' },
      { value: 'OEF/CTH', label: 'PET-equivalent', labelKr: 'PET-equivalent' },
      { value: 'DAWN', label: 'Thrombectomy criteria', labelKr: 'Thrombectomy 기준' },
    ],
    sections: [
      {
        // Slide 16-1: Perfusion Maps
        id: 'perfusion',
        title: 'Perfusion Map Analysis',
        titleKr: 'CT/MR Perfusion Map 분석',
        descEn: 'Standard perfusion maps (rCBV, rCBF, MTT, Tmax, Delay) plus Cercare\'s proprietary Advanced Maps (CTH, OEF, CMRO₂).\n— Achieving PET-equivalent oxygen metabolism measurement from CT/MR perfusion alone.',
        descKr: '표준 관류 지도(rCBV, rCBF, MTT, Tmax, Delay)와 Cercare 고유의 고급 지도(CTH, OEF, CMRO₂)를 함께 제공합니다.\n— CT/MR 관류 영상만으로 PET에 준하는 산소 대사 측정이 가능합니다.',
        images: [
          { src: '/images/ppt/image65.png', label: 'rCBF — Cerebral Blood Flow', labelKr: 'rCBF — Cerebral Blood Flow', equalRow: true },
          { src: '/images/ppt/image66.png', label: 'rCBV — Cerebral Blood Volume', labelKr: 'rCBV — Cerebral Blood Volume', equalRow: true },
          { src: '/images/ppt/image67.png', label: 'Tmax — Time to Maximum', labelKr: 'Tmax — Time to Maximum', equalRow: true },
          { src: '/images/ppt/image68.png', label: 'MTT — Mean Transit Time', labelKr: 'MTT — Mean Transit Time' },
          { src: '/images/ppt/image69.png', label: 'CTH — Capillary Transit Heterogeneity', labelKr: 'CTH — Capillary Transit Heterogeneity' },
          { src: '/images/ppt/image70.png', label: 'OEF — Oxygen Extraction Fraction', labelKr: 'OEF — Oxygen Extraction Fraction' },
        ],
        keyPoints: [
          { en: 'Standard Maps: rCBV, rCBF, MTT, Tmax, Delay', kr: 'Standard Maps: rCBV, rCBF, MTT, Tmax, Delay' },
          { en: 'Advanced Maps (Cercare CTH): OEF, CMRO₂, CTH — PET-equivalent without PET', kr: 'Advanced Maps (Cercare CTH): OEF, CMRO₂, CTH — PET-equivalent' },
        ],
      },
      {
        // Slide 16-2: Core–Penumbra Mismatch
        id: 'mismatch',
        title: 'Core–Penumbra Mismatch Analysis',
        titleKr: 'Core–Penumbra 불일치 분석',
        descEn: 'Automated mismatch quantification.\n— CBF<30% (ischemic core) vs Tmax>6s (penumbra). Mismatch ratio >1.8 indicates thrombectomy eligibility per DAWN/DEFUSE-3 criteria.',
        descKr: '허혈 핵심부와 반음영 간 불일치를 자동으로 정량화합니다.\n— CBF<30%(허혈 핵심부) vs Tmax>6s(반음영). 불일치 비율 >1.8이면 DAWN/DEFUSE-3 기준 혈전제거술 적응증에 해당합니다.',
        images: [
          { src: '/images/ppt/image71.jpg', label: 'Core–Penumbra Mismatch (CBF<30% vs Tmax>6s)', labelKr: 'Core–Penumbra Mismatch (CBF<30% vs Tmax>6s)', large: true },
        ],
        keyPoints: [
          { en: 'Core: CBF <30% = Irreversible ischemic core', kr: 'Core: CBF <30% = Irreversible ischemic core' },
          { en: 'Penumbra: Tmax >6s = Salvageable perfusion deficit', kr: 'Penumbra: Tmax >6s = Salvageable perfusion deficit' },
          { en: 'Mismatch ratio >1.8 → Thrombectomy indication (DAWN/DEFUSE-3)', kr: 'Mismatch ratio >1.8 → Thrombectomy 적응증 (DAWN/DEFUSE-3)' },
        ],
        legend: [
          { color: '#9b59b6', label: 'CBF <30%', detail: 'Irreversible ischemic core', labelKr: 'CBF <30%', detailKr: 'Irreversible ischemic core' },
          { color: '#f1c40f', label: 'Tmax >6s', detail: 'Salvageable penumbra', labelKr: 'Tmax >6s', detailKr: 'Salvageable penumbra' },
        ],
      },
    ],
  },

  hn: {
    name: 'DYNAPEX HN',
    nameKr: 'DYNAPEX HN',
    subtitle: 'Head & Neck Lymph Node',
    subtitleKr: '두경부 림프절',
    descEn: 'Contrast-enhanced Neck CT based lymph node auto-detection, Level I–VII classification using anatomical landmarks (internal jugular vein, mandible), and multi-timepoint longitudinal volume tracking for treatment response assessment.',
    descKr: '조영증강 경부 CT 기반 림프절 자동 검출, 해부학적 표지(내경정맥, 하악골) 기준 Level I–VII 분류, 다중 시점 체적 추적으로 치료 반응을 평가합니다.',
    required: ['CE Neck CT'],
    specs: [
      { value: 'CE CT', label: 'Input modality', labelKr: 'Input modality' },
      { value: 'I–VII', label: 'LN level classification', labelKr: 'LN Level 분류' },
      { value: 'Auto', label: 'RECIST measurement', labelKr: 'RECIST 측정' },
      { value: 'Longitudinal', label: 'Multi-timepoint tracking', labelKr: 'Multi-timepoint tracking' },
    ],
    sections: [
      {
        // Slide 17-1: LN Segmentation
        id: 'ln-segmentation',
        title: 'LN Auto-Segmentation & Detection',
        titleKr: '림프절 자동 분할 및 검출',
        descEn: 'AI automatically detects cervical lymph nodes on axial and coronal views. Essential for post-chemotherapy response assessment and early recurrence detection in H&N cancer.',
        descKr: 'AI가 축상(axial) 및 관상(coronal) 영상에서 경부 림프절을 자동으로 검출합니다. 두경부암 항암 치료 후 반응 평가와 조기 재발 검출에 필수적입니다.',
        images: [
          { src: '/images/ppt/image72.png', label: 'Neck CT Axial — Original', labelKr: 'Neck CT axial — 원본', equalRow: true },
          { src: '/images/ppt/image74.png', label: 'AI Lymph Node Detection (Axial)', labelKr: 'AI LN detection (Axial)', equalRow: true },
          { src: '/images/ppt/image73.png', label: 'Neck CT Coronal — Original', labelKr: 'Neck CT coronal — 원본', equalRow: true },
          { src: '/images/ppt/image75.png', label: 'AI Lymph Node Detection (Coronal)', labelKr: 'AI LN detection (Coronal)', equalRow: true },
        ],
        keyPoints: [
          { en: 'Individual LN volume + short/long axis diameter auto-calculation', kr: '개별 림프절 체적 + 단축/장축 직경 자동 산출' },
          { en: 'RECIST criteria support for treatment response', kr: 'RECIST 기준에 따른 치료 반응 평가 지원' },
        ],
      },
      {
        // Slide 17-2: LN Level Classification & Tracking
        id: 'ln-classification',
        title: 'LN Level Classification & Longitudinal Tracking',
        titleKr: 'LN Level 분류 및 추적 관찰',
        descEn: 'Classifies lymph nodes by anatomical level (IA Submandibular, IIA/IIB Upper Jugular, III Mid Jugular, etc.) using anatomical landmarks.\nTracks volume changes across timepoints for post-radiation residual LN tracking.',
        descKr: '해부학적 표지(내경정맥, 하악골) 기준으로 림프절을 Level별(IA 악하, IIA/IIB 상부 경정맥, III 중부 경정맥 등)로 분류하고,\n시점 간 체적 변화를 추적하여 방사선 치료 후 잔여 림프절을 모니터링합니다.',
        images: [
          { src: '/images/ppt/image76.png', label: 'LN Level Classification — Color-coded', labelKr: 'LN Level 분류 — Color-coded' },
          { src: '/images/ppt/image77.png', label: 'LN Level Detail — Upper Levels', labelKr: 'LN Level 상세 — Upper Levels' },
          { src: '/images/ppt/image78.png', label: 'LN Level Detail — Lower Levels', labelKr: 'LN Level 상세 — Lower Levels' },
          { src: '/images/ppt/image79.png', label: 'Original vs AI Overlay Comparison', labelKr: '원본 vs AI overlay 비교', pairLarge: true },
          { src: '/images/ppt/image80.png', label: 'HN Lymph Node Tracking Report', labelKr: 'HN LN tracking report', pairLarge: true },
        ],
        keyPoints: [
          { en: 'LN Level auto-classification: IA, IIA/IIB, III, IV, V based on anatomical landmarks', kr: '림프절 Level 자동 분류: IA, IIA/IIB, III, IV, V — 해부학적 표지 기준' },
          { en: 'Multi-timepoint tracking: New node detection + disappeared node flagging', kr: '다중 시점 추적: 신규 림프절 검출 + 소실 림프절 표시' },
        ],
      },
    ],
  },
}

export const platformData = {
  architecture: {
    title: 'Granular Pipeline Architecture',
    titleKr: 'Granular Pipeline 아키텍처',
    desc: '',
    image: '/images/ppt/image10.png',
    stages: ['Preprocessing', 'Atlas Registration', 'Parametric Mapping', 'AI Segmentation', 'Quantitative Analysis', 'Report Generation'],
  },
  stats: [
    { value: '30+', label: 'Installation Sites', labelKr: '도입 기관', sub: 'All tertiary hospitals', subKr: '상급종합병원 중심' },
    { value: '15+', label: 'In-house AI Models', labelKr: '자체 개발 AI 모델', sub: 'Dynapex developed', subKr: 'DYNAPEX 자체 개발' },
    { value: '10+', label: 'Partner AI Models', labelKr: '파트너 AI 모델', sub: 'Co-developed', subKr: '공동 개발' },
    { value: '20+', label: 'Public AI Models', labelKr: '공개 AI 모델', sub: 'Publicly available', subKr: '오픈소스 모델 활용' },
  ],
  platformStats: [
    { value: '30+', label: 'AI Models' },
    { value: '30→5 min', label: 'Per-case analysis' },
    { value: 'Zero-Click', label: 'PACS integration' },
    { value: '7', label: 'Disease areas' },
  ],
  advantages: [
    { title: 'Multi-AI module integration', titleKr: '다중 AI 모듈 통합', text: 'Supports brain tumors, stroke, dementia, and more.', textKr: '뇌종양, 뇌졸중, 치매 등 다양한 질환 영역을 포괄합니다.' },
    { title: 'Hospital-specific pipeline', titleKr: '병원 맞춤형 파이프라인', text: 'Optimized settings and reports for each workflow.', textKr: '각 병원의 워크플로우에 최적화된 설정과 리포트를 제공합니다.' },
    { title: 'Zero-click analysis', titleKr: 'Zero-click 분석', text: 'Minimal user intervention for faster, reproducible results.', textKr: '사용자 개입 없이 빠르고 재현 가능한 결과를 도출합니다.' },
    { title: 'Flexible partner integration', titleKr: '유연한 파트너 연동', text: 'Neuronphnet, DEEPNOID, Cercare Medical, and more.', textKr: 'Neuronphnet, DEEPNOID, Cercare Medical 등과의 연동을 지원합니다.' },
    { title: 'Research batch processing', titleKr: '연구용 일괄 처리', text: 'Quantitative analysis with CSV-based statistics.', textKr: 'CSV 기반 통계 분석으로 대량 데이터를 효율적으로 처리합니다.' },
    { title: 'Public research models', titleKr: '공개 연구 모델 지원', text: 'SynthSeg, DL-DiReCT, and others.', textKr: 'SynthSeg, DL-DiReCT 등 검증된 오픈소스 모델을 활용합니다.' },
  ],
  reportSamples: [
    { src: '/images/platform/sample1.png', label: 'Glioma' },
    { src: '/images/platform/sample2.png', label: 'Brain Metastasis' },
  ],
  productCards: [
    { id: 'gbm', title: 'Glioma', titleKr: '뇌종양', brand: 'DYNAPEX BT', img: '/images/ppt/image20.jpeg' },
    { id: 'mets', title: 'Brain Metastasis', titleKr: '뇌전이', brand: 'DYNAPEX METS', img: '/images/ppt/image34.png' },
    { id: 'aira', title: 'Alzheimer\'s Disease', titleKr: '알츠하이머', brand: 'DYNAPEX AD', img: '/images/ppt/image41.png' },
    { id: 'ms', title: 'Multiple Sclerosis', titleKr: '다발성 경화증', brand: 'DYNAPEX MS', img: '/images/ppt/image58.jpeg' },
    { id: 'stroke', title: 'Stroke', titleKr: '뇌졸중', brand: 'CERCARE STROKE', img: '/images/ppt/image66.png' },
    { id: 'hn', title: 'Head & Neck', titleKr: '두경부암', brand: 'DYNAPEX HN', img: '/images/ppt/image74.png' },
    { id: 'pd', title: "Parkinson's Disease", titleKr: '파킨슨병', brand: 'DYNAPEX PD', img: '/images/ppt/image61.png' },
  ],
}
