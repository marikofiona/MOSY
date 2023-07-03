class Category {
  constructor(id, title, image, page) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.page = page;
  }
}
class Page {
  constructor(id) {
    this.id = id;
  }
}

class Feeling {
  constructor(id, pageId, title, image) {
    this.id = id;
    this.pageId = pageId,
      this.title = title;
    this.image = image;
  }
}
class Company {
  constructor(id, title, image) {
    this.id = id;
    this.title = title;
    this.image = image;
  }
}
class ActivityItem {
  constructor(id, feelingId, companyId, title, info, isFav, image) {
    this.id = id;
    this.feelingId = feelingId;
    this.companyId = companyId;
    this.title = title;
    this.info = info;
    this.isFav = isFav;
    this.image = image;
  }
}
class FavoriteItem {
  constructor(title) {
    this.title = title;
  }
}
export { Category, Feeling, ActivityItem, Company, Page, FavoriteItem };





