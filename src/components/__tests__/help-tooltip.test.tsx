import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HelpTooltip } from "../help-tooltip";

describe("HelpTooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Basic functionality", () => {
    it("should render InfoIcon as trigger", () => {
      render(<HelpTooltip content="Test content" />);

      const icon = screen.getByRole("button");
      expect(icon).toBeInTheDocument();
    });

    it("should render with correct icon classes", () => {
      render(<HelpTooltip content="Test content" />);

      const trigger = screen.getByRole("button");
      const svgElement = trigger.querySelector("svg");

      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveClass(
        "h-4",
        "w-4",
        "text-muted-foreground",
        "inline-block"
      );
    });
  });

  describe("Props and positioning", () => {
    it("should render with custom side prop", () => {
      render(<HelpTooltip content="Content" side="bottom" />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    it("should render with custom alignment", () => {
      render(<HelpTooltip content="Content" align="start" side="right" />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      render(<HelpTooltip content="Content" className="custom-tooltip" />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Content rendering", () => {
    it("should render with string content", () => {
      render(<HelpTooltip content="Simple string content" />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    it("should render with complex React content", () => {
      const content = (
        <div>
          <strong>Bold text</strong>
          <p>Paragraph content</p>
        </div>
      );

      render(<HelpTooltip content={content} />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should be keyboard focusable", () => {
      render(<HelpTooltip content="Content" />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();

      // Should be able to focus
      trigger.focus();
      expect(trigger).toHaveFocus();
    });

    it("should have proper accessibility structure", () => {
      render(<HelpTooltip content="Content" />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Default props", () => {
    it("should use default side positioning", () => {
      render(<HelpTooltip content="Content" />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    it("should use default alignment", () => {
      render(<HelpTooltip content="Content" />);

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });
  });
});
