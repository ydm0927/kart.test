const questions = [
  {
    text: "아이템전 도중, 팀원이 공격당했어. 당신의 반응은?",
    options: [
      { text: "나도 일부러 공격 맞고 지름길 진입각 본다. 실험이지!", value: 6 },
      { text: "응? 누가 맞았어? 예쁜 내 카트 보다가 못봤다", value: 5 },
      { text: "내 알 바야? 나는 간다 안녕!", value: 3 },
      { text: "폭탄 투척~ 나도 다 날려버린다!", value: 2 }
    ]
  },
  {
    text: "새로운 카트가 나왔어! 제일 먼저 확인하는 건?",
    options: [
      { text: "외형이 얼마나 예쁜지부터! 색감, 이펙트 등등.", value: 5 },
      { text: "성능 수치지! 속도와 부스터부터 본다.", value: 3 },
      { text: "남들은 잘 안 쓰는 조합인데… 실험해볼까?", value: 6 },
      { text: "실드, 천사, 방어 아이템이 얼마나 잘 터지나부터 확인!", value: 1 }
    ]
  },
  {
    text: "가장 선호하는 플레이 스타일은?",
    options: [
      { text: "실드 두 개 모았다! 공격을 방어하며 안정적으로 달린다.", value: 1 },
      { text: "다 비켜 내가 간다! 시원하게 질주한다.", value: 3 },
      { text: "신박한 루트 발견. 이게 내 길이지!", value: 6 },
      { text: "좁은 길목이 보이면 스탑! 아무도 못지나가 후후", value: 4 }
    ]
  },
  {
    text: "스피드전에서 패배했어. 이유가 뭘까?",
    options: [
      { text: "내가 우리팀까지 다 날려버렸어", value: 2 },
      { text: "내가 천사를 좀 빨리 쓸걸...", value: 1 },
      { text: "남들이 안 가는 루트 타다 망했네…", value: 6 },
      { text: "내 카트가 안 예뻐서 그런듯ㅠ", value: 5 }
    ]
  },
  {
    text: "경기가 시작되기 전, 나는?",
    options: [
      { text: "저 아이템들 내가 다 먹어서 다 날려버리고 싶다.", value: 2 },
      { text: "예쁜 카트 + 캐릭터 + 펫 코디 뽐내기! 오늘도 난 완벽해", value: 5 },
      { text: "골목 체크 중. 막자하기 좋은 자리가 어딜까?", value: 4 },
      { text: "출발 부스터 쓸 준비. 바로 꺾어서 부스터 모아서 달릴 준비 완료", value: 3 }
    ]
  },
  {
    text: "승리한 후 가장 듣고 싶은 말은?",
    options: [
      { text: "팀킬 장난하냐!!", value: 2 },
      { text: "와, 앞으로 가질 못하겠네", value: 4 },
      { text: "와 실드 타이밍 미쳤다 / 그 천사 하나가 살렸네…", value: 1 },
      { text: "아니 벌써 완주했다고?", value: 3 }
    ]
  },
  {
    text: "내가 가장 좋아하는 맵은?",
    options: [
      { text: "전략적으로 움직이기 좋은 맵", value: 1 },
      { text: "남들은 싫어하지만 나는 숨은 루트가 보여", value: 6 },
      { text: "좁고 꼬인 길이 많아서 막자하기 좋은 맵", value: 4 },
      { text: "예쁘고 빛나는 배경의 감성 맵", value: 5 }
    ]
  },
  {
    text: "아이템전에서 가장 먼저 찾는 아이템은?",
    options: [
      { text: "무조건 부스터! 더 빨리, 더 멀리!", value: 3 },
      { text: "천사, 실드 같은 방어 아이템", value: 1 },
      { text: "바리케이드, 우주선, 부비트랩! 이 앞으로 아무도 못가!!", value: 4 },
      { text: "물폭탄, 벼락, 지뢰! 아무나 맞아라!!", value: 2 }
    ]
  },
  {
    text: "남들이 내 플레이를 보면 어떤 말이 제일 많아?",
    options: [
      { text: "상대팀 진짜 킹받겠다", value: 4 },
      { text: "쟤 꾸미는 건 진심이다", value: 5 },
      { text: "팀킬봐 난장판이네 ㅋㅋㅋㅋ", value: 2 },
      { text: "와 저 길이 가지네..", value: 6 }
    ]
  }
];

let current = 0;
const answers = [];

const qContainer = document.getElementById("questionContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const progressBar = document.getElementById("progressBar");

function showQuestion(index) {
  qContainer.innerHTML = "";

  const q = questions[index];
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${q.text}</p>`;

  q.options.forEach((opt, i) => {
    const id = `q${index}_opt${i}`;
    div.innerHTML += `
      <label>
        <input type="radio" name="q${index}" value="${opt.value}" ${answers[index] == opt.value ? "checked" : ""} />
        ${opt.text}
      </label>`;
  });

  qContainer.appendChild(div);

  // 버튼 상태
  prevBtn.disabled = index === 0;
  nextBtn.style.display = index < questions.length - 1 ? "inline-block" : "none";
  submitBtn.style.display = index === questions.length - 1 ? "inline-block" : "none";

  // 진행률 표시
  const percent = ((index + 1) / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
}

function getSelectedValue() {
  const checked = document.querySelector(`input[name="q${current}"]:checked`);
  return checked ? checked.value : null;
}

nextBtn.onclick = () => {
  const val = getSelectedValue();
  if (val === null) return alert("선택해 주세요!");
  answers[current] = val;
  current++;
  showQuestion(current);
};

prevBtn.onclick = () => {
  if (current > 0) current--;
  showQuestion(current);
};

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const val = getSelectedValue();
  if (val === null) return alert("선택해 주세요!");
  answers[current] = val;

  // 점수 계산
  const count = {1:0,2:0,3:0,4:0,5:0,6:0};
  answers.forEach(v => count[v]++);

  let maxType = null, max = 0;
  for (let type in count) {
    if (count[type] > max) {
      max = count[type];
      maxType = type;
    }
  }

  const types = {
    1: "🛡️ 안정적인 전략가형 - 팀 승리를 위해 조율하는 든든한 방패!",
    2: "💥 시원한 파괴자형 - 아군도 적도 없다, 나는 그저 폭발을 원할 뿐!",
    3: "🚀 광란의 질주형 - 브레이크 고장! 질주 본능 MAX!",
    4: "🧱 숨막히는 통제자형 - 여긴 못 지나간다! 넌 멈췄다!",
    5: "🎨 비주얼 크리에이터형 - 예쁜 게 최고! 꾸미는 재미로 탄다!",
    6: "🧠 규칙 파괴자형 - 남들과 다른 길을 개척하는 괴짜 천재!"
  };

  document.getElementById("quizForm").style.display = "none";
  document.getElementById("resultText").textContent = types[maxType];
  document.getElementById("result").style.display = "block";
});

showQuestion(current);
