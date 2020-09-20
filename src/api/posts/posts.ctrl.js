let postId = 1;

// posts 배열 초기 데이터
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

// 포스트 목록 조회
// GET /api/posts
exports.list = ctx => {
  ctx.body = posts;
};

// 포스트 작성
// POST /api/posts
// { title, body }
exports.write = ctx => {
  // REST API의 Request Body는 ctx.request.body에서 조회할 수 있습니다.
  console.log(ctx);
  const { title, body } = ctx.request.body;
  postId += 1; // 기존 postId값에 1을 더합니다.
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

// 특정 포스트 조회
// GET /api/posts/:id
exports.read = ctx => {
  const { id } = ctx.params;
  // 주어진 id 값으로 포스트를 찾습니다.
  const post = posts.find(p => p.id === +id);
  // 포스트가 없으면 오류를 반환합니다.
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  ctx.body = post;
};

// 특정 포스트 제거
// DELETE /api/posts/:id
exports.remove = ctx => {
  const { id } = ctx.params;
  // 해당 id를 가진 post의 index를 알아냅니다.
  const index = posts.findIndex(p => p.id === +id);
  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // index번째 item을 제거합니다.
  posts.splice(index, 1);
  ctx.status = 204; // No content
};

// 포스트 수정 (교체)
// PUT /api/posts/:id
// { title, body }
exports.replace = ctx => {
  // PUT methodd는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용합니다.
  const { id } = ctx.params;
  // 해당 id를 가진 post의 index를 알아냅니다.
  const index = posts.findIndex(p => p.id === +id);
  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // 전체 객체를 덮어 씌웁니다.
  // 따라서 id를 제외한 기존 정볼르 날리고, 객체를 새로 만듭니다.
  posts[index] = {
    id: +id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

// 포스트 수정 (특정 필드 변경)
// PATCH /api/posts/:id
// { title, body }
exports.update = ctx => {
  // PATCH method는 주어진 필드만 교체합니다.
  const { id } = ctx.params;
  // 해당 id를 가진 post의 index를 알아냅니다.
  const index = posts.findIndex(p => p.id === +id);
  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // 기존 값에 정보를 덮어 씌웁니다.
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};