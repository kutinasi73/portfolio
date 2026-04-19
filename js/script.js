/* ---------- ハンバーガーメニュー ---------- */
function toggleMenu() {
    const body    = document.getElementById('hamburger-body');
    const btn     = document.querySelector('.hamburger-icon');
    const label = document.querySelector('.hamburger-label');
    const Open  = body.classList.toggle('open');
    btn.setAttribute('aria-expanded', Open);
    label.textContent = Open ? 'CLOSE' : 'MENU';
    btn.classList.toggle('is-active', Open);
}

/* ---------- FVスライダー ---------- */
let fvCurrent = 0;
let fvTimer;

function fvMove(index) {
    const slides = document.querySelectorAll('.fv-slide');
    const dots   = document.querySelectorAll('.fv-dot');
    if (!slides.length) return;

    slides[fvCurrent].classList.remove('is-active');
    dots[fvCurrent].classList.remove('active');

    fvCurrent = index;

    slides[fvCurrent].classList.add('is-active');
    dots[fvCurrent].classList.add('active');
}

function fvAutoPlay() {
    fvTimer = setInterval(() => {
        const slides = document.querySelectorAll('.fv-slide');
        fvMove((fvCurrent + 1) % slides.length);
    }, 4000);
}

/* ---------- MEセクション「もっと見る / 閉じる」 ---------- */
function initMeToggle() {
    const detail   = document.getElementById('me-detail');
    const openBtn  = document.querySelector('.js-me-toggle');
    const closeBtn = document.querySelector('.js-me-close');

    if (!detail || !openBtn) return;

    openBtn.addEventListener('click', () => {
        detail.hidden = false;
        openBtn.setAttribute('aria-expanded', 'true');
        openBtn.hidden = true;           // 「もっと見る」ボタンを隠す
    });

    closeBtn?.addEventListener('click', () => {
        detail.hidden = true;
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.hidden = false;          // 「もっと見る」ボタンを再表示
        // 閉じたらMEセクション先頭にスクロール
        document.getElementById('me').scrollIntoView({ behavior: 'smooth' });
    });
}

/* ---------- スキルアコーディオン（デザイン / コーディング） ---------- */
function initSkillToggles() {
    document.querySelectorAll('.js-skill-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('aria-controls');
            const target   = document.getElementById(targetId);
            const isOpen   = !target.hidden;

            target.hidden = isOpen;
            btn.setAttribute('aria-expanded', !isOpen);
            btn.textContent = isOpen ? 'スキルを見る' : '閉じる';
        });
    });
}

/* ---------- WORK フィルター & さらに見る ---------- */
function initWorkSection() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allItems = document.querySelectorAll('.work-item');
    const loadMoreBtn = document.getElementById('js-load-more');
    const DISPLAY_COUNT = 6; // 最初に見せる数

    function updateDisplay(isInitial = false) {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        let visibleCount = 0;

        allItems.forEach(item => {
            const isMatch = activeFilter === 'all' || item.dataset.category === activeFilter;
            
            if (isMatch) {
                item.dataset.filtered = 'show';
                // 最初（フィルター切替時）は6件目までを表示、それ以外は隠す
                if (visibleCount < DISPLAY_COUNT) {
                    item.hidden = false;
                    item.classList.remove('work-item--hidden');
                } else {
                    item.hidden = true;
                    item.classList.add('work-item--hidden');
                }
                visibleCount++;
            } else {
                item.dataset.filtered = 'hide';
                item.hidden = true;
            }
        });

        // 「さらに見る」ボタンを出すかどうか
        const hiddenMatches = [...allItems].filter(i => i.dataset.filtered === 'show' && i.hidden);
        loadMoreBtn.hidden = hiddenMatches.length === 0;
    }

    // フィルターボタンのクリックイベント
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateDisplay();
        });
    });

    // 「さらに見る」ボタンのクリックイベント
    loadMoreBtn.addEventListener('click', () => {
        const targets = [...allItems].filter(i => i.dataset.filtered === 'show' && i.hidden);
        
        targets.slice(0, DISPLAY_COUNT).forEach(item => {
            item.hidden = false;
            item.classList.remove('work-item--hidden');
        });

        // 残りがなくなったらボタンを消す
        if (targets.length <= DISPLAY_COUNT) {
            loadMoreBtn.hidden = true;
        }
    });
    // 初回実行
    updateDisplay();
}
// 実行
document.addEventListener('DOMContentLoaded', initWorkSection);

/* ---------- ご相談フォームはこちら ---------- */
const planeButtons = document.querySelectorAll('.plane-submit');

planeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('.plane-icon');
        const scrollTarget = btn.getAttribute('data-scroll'); // 固定バー用
        const targetId = btn.getAttribute('data-target');    // フォーム/SNS用
        const maskId = btn.getAttribute('data-mask');

        if (icon.classList.contains('is-flying')) return;

        // 1. 飛行機を飛ばす
        icon.classList.add('is-flying');

        // 2. 挙動の分岐
        if (scrollTarget) {
            // 【パターンA】固定バーの場合：スクロールさせる
            setTimeout(() => {
                const targetEl = document.querySelector(scrollTarget);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });

                // スクロール後に飛行機をコッソリ戻す
                setTimeout(() => {
                    icon.style.transition = 'none';
                    icon.classList.remove('is-flying');
                    setTimeout(() => { icon.style.transition = ''; }, 100);
                }, 1000);
            }, 600);

        } else if (targetId && maskId) {
            // 【パターンB】フォーム/SNSの場合：ポップアップを出す
            const targetBox = document.getElementById(targetId);
            const targetMask = document.getElementById(maskId);

            setTimeout(() => {
                targetMask.classList.remove('hidden');
                targetBox.classList.remove('hidden');
            }, 600);

            targetMask.onclick = () => {
                targetMask.classList.add('hidden');
                targetBox.classList.add('hidden');
                
                icon.style.transition = 'none';
                icon.classList.remove('is-flying');
                setTimeout(() => { icon.style.transition = ''; }, 100);
            };
        }
    });
});

/* ---------- DOMContentLoaded ---------- */
document.addEventListener('DOMContentLoaded', () => {
    // 初期化
    fvAutoPlay();
    initMeToggle();
    initSkillToggles();

    // work-item に初期フィルター値をセット
    document.querySelectorAll('.work-item').forEach(item => {
        item.dataset.filtered = 'show';
    });
});