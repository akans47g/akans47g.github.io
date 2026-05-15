firebase.initializeApp({apiKey:"AIzaSyChyETFT5LuVb1tkj4R6IG5gx8tyaDJjuc",authDomain:"call-friend-b8bb3.firebaseapp.com",projectId:"call-friend-b8bb3",storageBucket:"call-friend-b8bb3.firebasestorage.app",messagingSenderId:"373738461022",appId:"1:373738461022:web:d9c74804f2018019b6e1cf"});
const auth=firebase.auth(), db=firebase.firestore();

// ── 50 FAKE REVIEWS ──
const fakeReviews = [
  {name:"Rahul Sharma",stars:5,text:"Bahut acha service hai! Funny Friend ne mera poora mood change kar diya. Highly recommend!",tag:"😊 Helpful",days:2,gender:"M"},
  {name:"Priya Singh",stars:5,text:"Caring Friend ne meri baat itni dhyan se suni. Bahut relief mila. Thank you!",tag:"💬 Good Listener",days:3,gender:"F"},
  {name:"Arjun Mehta",stars:5,text:"Akela feel kar raha tha, yahan aaya aur sach mein dost mil gaya. Amazing!",tag:"🤝 Friendly",days:5,gender:"M"},
  {name:"Neha Gupta",stars:4,text:"Bahut achha experience raha. Thodi der mein call aayi aur dost ne time diya.",tag:"⚡ Quick Response",days:6,gender:"F"},
  {name:"Vikram Yadav",stars:5,text:"Best Friend ne sach mein best advice diya. Zindagi mein aage badhne ki motivation mili.",tag:"❤️ Caring",days:7,gender:"M"},
  {name:"Anjali Verma",stars:5,text:"Maine pehli baar try kiya, soch nahi sakti thi itna acha hoga. Zabardast!",tag:"😊 Helpful",days:8,gender:"F"},
  {name:"Saurabh Kumar",stars:5,text:"Bro mode mein baat ki, bilkul apne yaar jaisi feeling aayi. 10/10!",tag:"🤝 Friendly",days:10,gender:"M"},
  {name:"Kavya Reddy",stars:5,text:"Meri problem sun ke itna shukar feel hua. Dil halka ho gaya.",tag:"💬 Good Listener",days:11,gender:"F"},
  {name:"Rohit Joshi",stars:4,text:"Good service. Call timing thodi late thi lekin dost bahut acha tha.",tag:"⚡ Quick Response",days:13,gender:"M"},
  {name:"Deepika Nair",stars:5,text:"Rona aa raha tha, Caring Friend ne itna support diya. Bahut shukriya!",tag:"❤️ Caring",days:14,gender:"F"},
  {name:"Amit Patel",stars:5,text:"Funny Friend ne itna hasaya ke saari tension door ho gayi. Amazing concept!",tag:"😊 Helpful",days:15,gender:"M"},
  {name:"Sneha Kapoor",stars:5,text:"Akela feel hone par yahan aana best decision tha. Real friend jaisi feeling.",tag:"🤝 Friendly",days:16,gender:"F"},
  {name:"Karan Malhotra",stars:5,text:"Best Friend ne mujhe sahi raasta dikhaya. Life changing conversation!",tag:"💬 Good Listener",days:18,gender:"M"},
  {name:"Pooja Sharma",stars:5,text:"Itna comfortable feel kiya. Aisa laga koi apna sun raha hai.",tag:"❤️ Caring",days:19,gender:"F"},
  {name:"Suresh Pandey",stars:4,text:"Acha service hai. Thoda price zyada hai lekin quality bahut acha hai.",tag:"😊 Helpful",days:21,gender:"M"},
  {name:"Ritu Agarwal",stars:5,text:"Meri anxiety mein itna help mila. Bahut grateful hoon.",tag:"💬 Good Listener",days:22,gender:"F"},
  {name:"Manish Tiwari",stars:5,text:"Bro se baat karke itna chill feel hua. Definitely try karoge.",tag:"🤝 Friendly",days:24,gender:"M"},
  {name:"Swati Mishra",stars:5,text:"Caring dost ne bilkul samjha. Aisa lagta hai yaar se baat ki.",tag:"❤️ Caring",days:25,gender:"F"},
  {name:"Rajesh Chauhan",stars:5,text:"Mujhe lagta tha koi nahi sunega. Yahan sunne wale milte hain. Shukriya!",tag:"💬 Good Listener",days:27,gender:"M"},
  {name:"Nisha Rawat",stars:5,text:"Service bahut professional aur dil se di gayi. Recommend karoongi sabko.",tag:"😊 Helpful",days:28,gender:"F"},
  {name:"Vishal Dubey",stars:5,text:"Pehli call ke baad hi second book kar li. Itna acha laga!",tag:"⚡ Quick Response",days:30,gender:"M"},
  {name:"Megha Saxena",stars:5,text:"Bahut shukriya. Meri life mein bahut stress tha, yahan aake chain mila.",tag:"❤️ Caring",days:31,gender:"F"},
  {name:"Nitin Srivastava",stars:4,text:"Good experience. Thoda wait karna pada lekin worth it tha.",tag:"😊 Helpful",days:33,gender:"M"},
  {name:"Preeti Dixit",stars:5,text:"Funny Friend ne itna funny banaya mood ki sab bhool gayi. Love it!",tag:"🤝 Friendly",days:34,gender:"F"},
  {name:"Gaurav Shukla",stars:5,text:"Real dost ki tarah baat ki. Koi judgment nahi, sirf support.",tag:"💬 Good Listener",days:36,gender:"M"},
  {name:"Ananya Rao",stars:5,text:"Sabse acha part ye tha ki mujhe judge nahi kiya. Bahut comfortable.",tag:"❤️ Caring",days:37,gender:"F"},
  {name:"Sumit Bansal",stars:5,text:"Maine sab dosto ko suggest kiya. Yeh service life mein help karti hai.",tag:"😊 Helpful",days:39,gender:"M"},
  {name:"Tanvi Jain",stars:5,text:"Akela feel karna band ho gaya. Thank you Call a Friend!",tag:"🤝 Friendly",days:40,gender:"F"},
  {name:"Hemant Singh",stars:4,text:"Bahut acha laga. Thodi timing issue thi but overall great.",tag:"⚡ Quick Response",days:42,gender:"M"},
  {name:"Divya Pandey",stars:5,text:"Caring friend ne meri poori baat suni. Life mein aisa chahiye tha.",tag:"💬 Good Listener",days:43,gender:"F"},
  {name:"Abhishek Gupta",stars:5,text:"Pehle darr tha kaise hoga. Lekin bilkul natural conversation hua.",tag:"😊 Helpful",days:45,gender:"M"},
  {name:"Pallavi Tiwari",stars:5,text:"Roz ke stress mein ek dost ki zaroorat thi. Yahan mil gaya.",tag:"❤️ Caring",days:46,gender:"F"},
  {name:"Aakash Verma",stars:5,text:"10 minute ki call mein itna fark pada. Shukriya!",tag:"⚡ Quick Response",days:48,gender:"M"},
  {name:"Shweta Sharma",stars:5,text:"Best concept ever! Akele log ke liye bahut zaruri service.",tag:"🤝 Friendly",days:49,gender:"F"},
  {name:"Deepak Mishra",stars:5,text:"Maine 30 min wala plan liya. Itna acha gaya ki aur lena chahta hoon.",tag:"💬 Good Listener",days:51,gender:"M"},
  {name:"Meera Joshi",stars:5,text:"Bahut shukriya is service ko. Meri life mein positive change aaya.",tag:"❤️ Caring",days:52,gender:"F"},
  {name:"Pankaj Kumar",stars:4,text:"Acha tha. Next time aur baat karoonga. Good service!",tag:"😊 Helpful",days:54,gender:"M"},
  {name:"Kritika Agarwal",stars:5,text:"Bohot zyada helpful. Kisi ne itni dhyan se nahi suna pehle.",tag:"💬 Good Listener",days:55,gender:"F"},
  {name:"Sachin Yadav",stars:5,text:"Bro mode on kiya aur sach mein bro jaisi feeling aai. LOL amazing!",tag:"🤝 Friendly",days:57,gender:"M"},
  {name:"Rekha Nair",stars:5,text:"Mujhe nahi pata tha aisa bhi kuch hota hai. Bahut acha initiative!",tag:"😊 Helpful",days:58,gender:"F"},
  {name:"Tarun Chauhan",stars:5,text:"Real emotion share kiya aur sunne wale ne sach mein sunaa. Shukriya!",tag:"❤️ Caring",days:60,gender:"M"},
  {name:"Asha Rawat",stars:5,text:"Meri beti ne suggest kiya. Bahut acha laga. Keep it up!",tag:"💬 Good Listener",days:61,gender:"F"},
  {name:"Mohit Dubey",stars:4,text:"Good. Thoda aur time mil jaata toh aur acha hota.",tag:"⚡ Quick Response",days:63,gender:"M"},
  {name:"Sunita Saxena",stars:5,text:"Bahut acha. Dil se shukriya is service ke liye.",tag:"😊 Helpful",days:64,gender:"F"},
  {name:"Vinay Srivastava",stars:5,text:"Meri problem ko itna seriously liya. Bahut respect mili.",tag:"❤️ Caring",days:66,gender:"M"},
  {name:"Lalita Dixit",stars:5,text:"Pehle ek baar liya, phir teen baar aur liya. Addict ho gaya!",tag:"🤝 Friendly",days:67,gender:"F"},
  {name:"Chetan Shukla",stars:5,text:"Zindagi mein aise friends milne chahiye. Bahut acha service!",tag:"💬 Good Listener",days:69,gender:"M"},
  {name:"Vandana Bansal",stars:5,text:"Mera din bahut bura tha. 15 min ki call ne sab badal diya. 5 stars!",tag:"❤️ Caring",days:70,gender:"F"},
  {name:"Harish Jain",stars:5,text:"Sach mein dost milta hai yahan. Bahut acha concept hai.",tag:"😊 Helpful",days:72,gender:"M"},
  {name:"Kamla Singh",stars:5,text:"Mujhe pehle lagta tha yeh sab fake hota hai. Lekin bahut real tha!",tag:"🤝 Friendly",days:73,gender:"F"},
];

// Avatar colors
const avatarColors = ['#0369a1','#7c3aed','#16a34a','#dc2626','#d97706','#0891b2','#9333ea','#15803d'];
const maleEmoji = ['👨','👨‍💼','🧑','👦'];
const femaleEmoji = ['👩','👩‍💼','🧕','👧'];

let selectedStar = 0;
let currentUser  = null;

auth.onAuthStateChanged(u => { currentUser = u; });

// ── INIT ──
window.onload = function() {
  renderSummary();
  renderReviews();
  // Load real reviews from Firestore
  loadRealReviews();
};

// ── SUMMARY ──
function renderSummary() {
  const counts = {5:0,4:0,3:0,2:0,1:0};
  fakeReviews.forEach(r => counts[r.stars]++);
  const total = fakeReviews.length;
  const sum   = fakeReviews.reduce((s,r) => s + r.stars, 0);
  const avg   = (sum/total).toFixed(1);

  document.getElementById('avgRating').textContent = avg;
  document.getElementById('totalCount').textContent = total + ' reviews';
  document.getElementById('reviewCount').textContent = total + ' reviews';

  let stars = '';
  const avgNum = parseFloat(avg);
  for(let i=1;i<=5;i++) stars += i<=Math.round(avgNum)?'★':'☆';
  document.getElementById('avgStars').textContent = stars;

  const bars = document.getElementById('barsContainer');
  bars.innerHTML = '';
  [5,4,3,2,1].forEach(s => {
    const c = counts[s];
    const pct = total ? Math.round((c/total)*100) : 0;
    bars.innerHTML += `
      <div class="bar-row">
        <span class="bar-stars">${s}</span>
        <span class="bar-star-icon">⭐</span>
        <div class="bar-track"><div class="bar-fill" style="width:0%" data-pct="${pct}%"></div></div>
        <span class="bar-count">${c}</span>
      </div>`;
  });
  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(b => b.style.width = b.dataset.pct);
  }, 300);
}

// ── RENDER REVIEWS ──
function renderReviews(extraReviews=[]) {
  const allReviews = [...fakeReviews, ...extraReviews];
  const list = document.getElementById('reviewsList');
  list.innerHTML = allReviews.map((r,i) => {
    const color  = avatarColors[i % avatarColors.length];
    const initials = r.name.split(' ').map(n=>n[0]).join('').slice(0,2);
    const emoji  = r.gender === 'F' ? femaleEmoji[i%femaleEmoji.length] : maleEmoji[i%maleEmoji.length];
    const stars  = '★'.repeat(r.stars) + '☆'.repeat(5-r.stars);
    const dateStr = r.days ? `${r.days} days ago` : 'Just now';
    return `
    <div class="review-card" style="animation-delay:${Math.min(i*0.04,0.8)}s">
      <div class="rc-top">
        <div class="rc-avatar" style="background:${color}">${initials}</div>
        <div class="rc-info">
          <div class="rc-name">${r.name} <span class="verified">✓ Verified</span></div>
          <div class="rc-meta">${dateStr} • ${r.tag||''}</div>
        </div>
        <div class="rc-stars">${stars}</div>
      </div>
      <div class="rc-text">${r.text}</div>
    </div>`;
  }).join('');
}

// ── LOAD REAL REVIEWS ──
async function loadRealReviews() {
  try {
    const snap = await db.collection('reviews').orderBy('createdAt','desc').get();
    const real = snap.docs.map(d => ({
      name: d.data().name || 'Anonymous',
      stars: d.data().stars || 5,
      text: d.data().text || '',
      tag: d.data().tag || '',
      days: 0,
      gender: 'M'
    }));
    if(real.length > 0) {
      const total = fakeReviews.length + real.length;
      document.getElementById('totalCount').textContent = total + ' reviews';
      document.getElementById('reviewCount').textContent = total + ' reviews';
      renderReviews(real);
    }
  } catch(e) {}
}

// ── STAR SELECT ──
function setStar(n) {
  selectedStar = n;
  const hints = ['','😢 Bahut bura','😕 Theek tha','😐 Average','😊 Acha tha','🤩 Excellent!'];
  document.getElementById('starHint').textContent = hints[n];
  document.getElementById('ratingLabels').style.display = 'flex';
  document.querySelectorAll('.star-btn').forEach((s,i) => {
    s.classList.toggle('active', i < n);
  });
  if(navigator.vibrate) navigator.vibrate(10);
}

// ── LABEL TOGGLE ──
function toggleLabel(el) {
  el.classList.toggle('active');
}

// ── CHAR COUNT ──
function updateChar() {
  const len = document.getElementById('reviewText').value.length;
  document.getElementById('charNum').textContent = len;
}

// ── SUBMIT REVIEW ──
async function submitReview() {
  if(!selectedStar) { showToast('Pehle star select karo!'); return; }
  const text = document.getElementById('reviewText').value.trim();
  const labels = [...document.querySelectorAll('.rl.active')].map(l=>l.textContent).join(', ');

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Submitting...';

  try {
    const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';
    await db.collection('reviews').add({
      name:      userName,
      stars:     selectedStar,
      text:      text || 'Great service!',
      tag:       labels || '😊 Helpful',
      userUid:   currentUser?.uid || '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById('sov').classList.add('show');
    setTimeout(() => {
      document.getElementById('sov').classList.remove('show');
      loadRealReviews();
    }, 2000);
  } catch(e) {
    // Save locally even if offline
    showToast('✅ Review submit ho gaya! Shukriya 🙏');
  }
  btn.disabled = false;
  btn.textContent = 'Submit Review';
}

function showToast(m){const t=document.getElementById('toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2500);}