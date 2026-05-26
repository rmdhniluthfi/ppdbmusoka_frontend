const API_BASE =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost/PPDB_MUSOKA/backend";

let csrfToken = sessionStorage.getItem("csrf_token") || null;

async function request(method, endpoint, data = null, isFormData = false) {
  const url = `${API_BASE}/${endpoint.replace(/^\//, "")}`;
  const opts = { method, credentials: "include", headers: {} };

  if (csrfToken) opts.headers["X-CSRF-Token"] = csrfToken;

  if (data) {
    if (isFormData) {
      opts.body = data;
    } else {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(data);
    }
  }

  const res = await fetch(url, opts);

  let json;
  try {
    const text = await res.text();
    json = text ? JSON.parse(text) : {};
  } catch (e) {
    throw {
      status: res.status,
      message: `Server error (${res.status}): response bukan JSON`,
    };
  }

  if (json.data?.csrf_token) {
    csrfToken = json.data.csrf_token;
    sessionStorage.setItem("csrf_token", csrfToken);
  }

  if (!res.ok) throw { status: res.status, ...json };
  return json;
}

const api = {
  get: (ep) => request("GET", ep),
  post: (ep, d) => request("POST", ep, d),
  patch: (ep, d) => request("PATCH", ep, d),
  delete: (ep) => request("DELETE", ep),
  upload: (ep, fd) => request("POST", ep, fd, true),
};

export default api;
