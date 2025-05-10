declare global {
  module "highlight.js" {
    interface HighlightResult {
      _top?: {
        aliases: string[];
      };
    }
  }
}
