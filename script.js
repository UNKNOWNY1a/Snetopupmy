const SUPABASE_URL = "https://spxidzfqjgpifvutqjlx.supabase.co";
const SUPABASE_KEY = "sb_publishable_plobSMHs6jmvbWomZdh06w_JwTxVfql";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
let currentRefNo = ""; let soundEnabled = true; let allGamesData = [];
let currentPlatform = 'all'; let currentPill = 'all';
let currentUser = null;

setTimeout(() => { document.getElementById('bootScreen').classList.add('hide'); renderGames(); checkUser(); }, 2000);

// --- LOGIK AUTH ---
async function checkUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentUser = session ? session.user : null;
    updateAuthUI();
}

function updateAuthUI() {
    const btn = document.getElementById('authBtn');
    if(!btn) return;
    if(currentUser) {
        btn.innerText = "Logout (" + currentUser.email.split('@')[0] + ")";
        btn.style.borderColor = "#10b981";
        btn.style.color = "#10b981";
    } else {
        btn.innerText = "Login";
        btn.style.borderColor = "var(--primary)";
        btn.style.color = "var(--primary)";
    }
}

function handleAuthNav() {
    if(currentUser) {
        supabaseClient.auth.signOut().then(() => {
            currentUser = null;
            updateAuthUI();
            alert("Anda telah log keluar.");
        });
    } else {
        window.location.href = 'login.html';
    }
}

// --- UI LOGIC ---
const scrollContainer = document.getElementById('scrollContainer');
const pullRefresh = document.getElementById('pullRefresh');
if(scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
        if(scrollContainer.scrollTop === 0) { if(pullRefresh) { pullRefresh.classList.add('show'); setTimeout(() => pullRefresh.classList.remove('show'), 1500); } }
        let st = scrollContainer.scrollTop;
        if(st > 50) document.getElementById('navbar').classList.add('hidden'); else document.getElementById('navbar').classList.remove('hidden');
        if(st > 300) document.getElementById('backToTop').classList.add('show'); else document.getElementById('backToTop').classList.remove('show');
    });
}

document.addEventListener('keydown', (e) => { if(e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); document.getElementById('searchInput').focus(); } });
window.addEventListener('blur', () => { document.title = 'YAHDD STORE | S-Tier Topup'; });
window.addEventListener('focus', () => { document.title = '🔥 YAHDD STORE | S-Tier Topup'; });

setInterval(() => { document.getElementById('liveClock').innerText = new Date().toLocaleTimeString('en-GB'); }, 1000);
setInterval(() => { document.getElementById('liveVisitors').innerText = `${Math.floor(Math.random() * 50) + 10} orang sedang melihat`; }, 3000);

function toggleSound() { soundEnabled = !soundEnabled; document.getElementById('soundBtn').innerText = soundEnabled ? '🔊' : '🔇'; }
function bunyiKlik() { if (!soundEnabled) return; try { const a = new (window.AudioContext || window.webkitAudioContext)(); const o = a.createOscillator(); const g = a.createGain(); o.type = 'square'; o.frequency.setValueAtTime(150, a.currentTime); o.frequency.exponentialRampToValueAtTime(50, a.currentTime + 0.05); g.gain.setValueAtTime(0.1, a.currentTime); g.gain.exponentialRampToValueAtTime(0.01, a.currentTime + 0.05); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + 0.05); if (navigator.vibrate) navigator.vibrate(20); } catch(e) {} }

function cariGame() { let input = document.getElementById('searchInput').value.toLowerCase(); let cards = document.querySelectorAll('.game-card'); cards.forEach(card => { let title = card.querySelector('.game-title').innerText.toLowerCase(); card.style.display = title.includes(input) ? 'flex' : 'none'; }); }

// --- DATA ---
const games = [
    { id: 'mlbb', name: 'Mobile Legends', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 5.00', rating: '4.9', hot: true },
    { id: 'pubg', name: 'PUBG Mobile', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 4.50', rating: '4.8', hot: false },
    { id: 'ff', name: 'Free Fire', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 3.00', rating: '4.7', hot: false },
    { id: 'robux', name: 'Roblox', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 5.00', rating: '4.9', hot: true },
    { id: 'genshin', name: 'Genshin Impact', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 20.00', rating: '4.8', hot: false },
    { id: 'codm', name: 'COD Mobile', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 5.00', rating: '4.6', hot: false },
    { id: 'honkai', name: 'Honkai: Star Rail', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 20.00', rating: '4.8', hot: true },
    { id: 'aov', name: 'Arena of Valor', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 5.00', rating: '4.5', hot: false },
    { id: 'wildrift', name: 'LoL: Wild Rift', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 5.00', rating: '4.7', hot: false },
    { id: 'efootball', name: 'eFootball', platform: 'mobile', bg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 5.00', rating: '4.4', hot: false },
    { id: 'valorant', name: 'Valorant', platform: 'pc', bg: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 15.00', rating: '4.9', hot: true },
    { id: 'cs2', name: 'Counter-Strike 2', platform: 'pc', bg: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 10.00', rating: '4.8', hot: false },
    { id: 'dota2', name: 'Dota 2', platform: 'pc', bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 10.00', rating: '4.7', hot: false },
    { id: 'lol', name: 'League of Legends', platform: 'pc', bg: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 10.00', rating: '4.8', hot: false },
    { id: 'apex', name: 'Apex Legends', platform: 'pc', bg: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 15.00', rating: '4.6', hot: false },
    { id: 'fortnite', name: 'Fortnite', platform: 'pc', bg: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 10.00', rating: '4.5', hot: false },
    { id: 'gta5', name: 'GTA V Online', platform: 'pc', bg: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 20.00', rating: '4.9', hot: true },
    { id: 'wow', name: 'World of Warcraft', platform: 'pc', bg: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 25.00', rating: '4.7', hot: false },
    { id: 'rust', name: 'Rust', platform: 'pc', bg: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 20.00', rating: '4.6', hot: false },
    { id: 'genshinpc', name: 'Genshin (PC)', platform: 'pc', bg: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=400&auto=format&fit=crop', minPrice: 'RM 20.00', rating: '4.8', hot: false }
];

const packages = {
    'mlbb': [{ name: '86 Diamond', price: 500 }, { name: '172 Diamond', price: 1000 }, { name: '257 Diamond', price: 1500 }],
    'pubg': [{ name: '60 UC', price: 450 }, { name: '325 UC', price: 2200 }],
    'robux': [{ name: '80 Robux', price: 500 }, { name: '400 Robux', price: 2400 }],
    'valorant': [{ name: '475 VP', price: 1500 }, { name: '1000 VP', price: 3000 }],
    'cs2': [{ name: 'Prime Status', price: 1000 }],
    'dota2': [{ name: '1000 Shards', price: 1000 }]
};

let selectedGame = null; let selectedPackage = null;

function renderGames() {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = "";
    allGamesData = games;
    let filtered = allGamesData.filter(g => currentPlatform === 'all' || g.platform === currentPlatform);
    if(currentPill === 'populer') filtered = filtered.filter(g => g.hot);
    if(currentPill === 'murah') filtered = filtered.sort((a,b) => parseInt(a.minPrice.replace('RM ','')) - parseInt(b.minPrice.replace('RM ','')));
    
    filtered.forEach(game => {
        let card = document.createElement('div');
        card.className = 'game-card';
        card.onclick = () => { bunyiKlik(); bukaModal(game.name, game.id); };
        let isFav = localStorage.getItem('fav_' + game.id) === 'true';
        card.innerHTML = `
            <div style="position:absolute; top:8px; left:8px; z-index:10; cursor:pointer;" onclick="toggleFav(event, '${game.id}')">${isFav ? '❤️' : '🤍'}</div>
            <div class="game-bg" style="background-image: url('${game.bg}')" onerror="this.style.background='linear-gradient(45deg, #1a0000, #330000)'">
                ${game.platform === 'pc' ? '<span class="badge-pc">PC</span>' : ''}
                ${game.hot ? '<span class="badge-hot">HOT</span>' : ''}
            </div>
            <div class="game-content">
                <div class="game-title">${game.name}</div>
                <div class="rating">⭐ ${game.rating}</div>
                <div class="game-price">Mula ${game.minPrice}</div>
            </div>
        `;
        gameGrid.appendChild(card);
    });
}

function toggleFav(e, id) { e.stopPropagation(); bunyiKlik(); let isFav = localStorage.getItem('fav_' + id) === 'true'; localStorage.setItem('fav_' + id, !isFav); renderGames(); }
function tapisPlatform(platform, btn) { bunyiKlik(); currentPlatform = platform; document.querySelectorAll('.tab').forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderGames(); }
function tapisPill(type, btn) { bunyiKlik(); currentPill = type; document.querySelectorAll('.pill').forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderGames(); }

function validateInput() {
    let val = document.getElementById('playerId').value.trim();
    let err = document.getElementById('inputError');
    let btn = document.getElementById('btnBeli');
    if(val.length > 0 && val.length < 4) { err.style.display = 'block'; document.getElementById('playerId').classList.add('error'); if(selectedPackage) btn.disabled = true; }
    else { err.style.display = 'none'; document.getElementById('playerId').classList.remove('error'); if(selectedPackage && val.length >= 4) btn.disabled = false; }
}

function bukaModal(namaGame, gameId) {
    selectedGame = namaGame; selectedPackage = null;
    document.getElementById('modalTitle').innerText = "Topup " + namaGame;
    document.getElementById('playerId').value = "";
    document.getElementById('btnBeli').disabled = true; document.getElementById('btnBeli').innerText = "Pilih Pakej";
    document.getElementById('orderSummary').classList.remove('show'); document.getElementById('inputError').style.display = 'none';
    const itemList = document.getElementById('itemList'); itemList.innerHTML = "";
    let pkgs = packages[gameId] || packages['mlbb'];
    pkgs.forEach(pkg => {
        let btn = document.createElement('div'); btn.className = 'item-btn';
        btn.innerHTML = `<div class="pkg-name">${pkg.name}</div><div class="pkg-price">RM ${(pkg.price / 100).toFixed(2)}</div>`;
        btn.onclick = () => {
            bunyiKlik(); document.querySelectorAll('.item-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
            selectedPackage = pkg;
            let summary = document.getElementById('orderSummary');
            summary.innerHTML = `Game: <strong>${selectedGame}</strong><br>Pakej: <strong>${pkg.name}</strong><br>Harga: <strong>RM ${(pkg.price / 100).toFixed(2)}</strong>`;
            summary.classList.add('show'); validateInput();
            if(document.getElementById('playerId').value.length >= 4) { document.getElementById('btnBeli').disabled = false; document.getElementById('btnBeli').innerText = `Beli - RM ${(pkg.price / 100).toFixed(2)}`; }
        };
        itemList.appendChild(btn);
    });
    document.getElementById('topupModal').classList.add('show');
}

function tutupModal() { document.getElementById('topupModal').classList.remove('show'); }

async function prosesBeli() {
    let playerId = document.getElementById('playerId').value.trim();
    if (!playerId || playerId.length < 4) return alert("ID tidak sah!");
    if (!selectedPackage) return alert("Pilih pakej!");

    tutupModal(); document.getElementById('loadingScreen').style.display = 'flex';
    let progress = 0; let pBar = document.getElementById('progressBarFill'); let pText = document.getElementById('progressText');
    let interval = setInterval(() => { progress += 10; pBar.style.width = progress + '%'; pText.innerText = progress + '%'; if(progress >= 100) clearInterval(interval); }, 100);
    let refNo = "YH-" + Math.floor(Math.random() * 1000000);

    try {
        const { error } = await supabaseClient.from('orders').insert([{ ref_no: refNo, game: selectedGame, player_id: playerId, pakej: selectedPackage.name, harga: selectedPackage.price, status: 'pending' }]);
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none'; pBar.style.width = '0%'; pText.innerText = '0%';
            if (error) { alert("Gagal. Ralat Database."); }
            else {
                currentRefNo = refNo;
                document.getElementById('resGame').innerText = selectedGame; document.getElementById('resPakej').innerText = selectedPackage.name; document.getElementById('resHarga').innerText = `RM ${(selectedPackage.price / 100).toFixed(2)}`; document.getElementById('resRef').innerText = refNo;
                document.getElementById('receiptModal').classList.add('show');
                triggerConfetti();
                let history = JSON.parse(localStorage.getItem('yahddHistory')) || [];
                history.unshift({ game: selectedGame, ref: refNo, date: new Date().toLocaleString() });
                localStorage.setItem('yahddHistory', JSON.stringify(history)); renderHistory();
            }
        }, 1200);
    } catch (err) { document.getElementById('loadingScreen').style.display = 'none'; alert("Ralat Sistem."); }
}

function salinRef() { navigator.clipboard.writeText(currentRefNo).then(() => alert("Ref No disalin!")); }
function tutupReceipt() { document.getElementById('receiptModal').classList.remove('show'); }
function triggerConfetti() { for(let i=0; i<30; i++) { let c = document.createElement('div'); c.className = 'confetti'; c.style.left = Math.random() * 100 + 'vw'; c.style.background = Math.random() > 0.5 ? '#ff0033' : '#10b981'; c.style.animationDuration = (Math.random() * 1 + 1) + 's'; document.body.appendChild(c); setTimeout(() => c.remove(), 2000); } }
function shareReceipt() { if (navigator.share) { navigator.share({ title: 'YAHDD STORE', text: `Saya baru topup ${selectedGame} (Ref: ${currentRefNo})`, url: window.location.href }).catch(console.error); } else { alert("Browser tidak menyokong share."); } }
function toggleHistory() { bunyiKlik(); document.getElementById('historySidebar').classList.toggle('open'); }
function renderHistory() { let history = JSON.parse(localStorage.getItem('yahddHistory')) || []; let container = document.getElementById('historyList'); if(history.length === 0) { container.innerHTML = "<p style='font-size:12px; color:#666;'>Tiada sejarah.</p>"; return; } container.innerHTML = history.map(h => `<div class="history-item"><span>${h.game}</span><br>Ref: ${h.ref}<br><small style="color:#666;">${h.date}</small></div>`).join(''); }

renderHistory();
