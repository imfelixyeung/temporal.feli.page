import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CopyButton } from "../copy-button";

// Mock navigator.clipboard
const mockClipboard = {
  writeText: vi.fn(),
  readText: vi.fn(),
};

Object.defineProperty(navigator, "clipboard", {
  value: mockClipboard,
  writable: true,
});

describe("CopyButton", () => {
  beforeEach(() => {
    mockClipboard.writeText.mockClear();
    mockClipboard.writeText.mockResolvedValue(undefined);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Basic functionality", () => {
    it("should render with copy icon by default", () => {
      render(<CopyButton value="test value" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-label", "Copy value");
      expect(button).toHaveAttribute("title", "Copy value");
    });

    it("should use custom label when provided", () => {
      render(<CopyButton value="test value" label="custom label" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Copy custom label");
      expect(button).toHaveAttribute("title", "Copy custom label");
    });

    it("should copy value when clicked", async () => {
      render(<CopyButton value="test value" />);
      const button = screen.getByRole("button");

      await act(async () => {
        fireEvent.click(button);
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith("test value");
    });

    it("should show check icon after successful copy", async () => {
      render(<CopyButton value="test value" />);
      const button = screen.getByRole("button");

      // Initially should show copy icon
      expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();

      await act(async () => {
        fireEvent.click(button);
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith("test value");

      // Should show check icon after copy
      expect(screen.getByTestId("check-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("copy-icon")).not.toBeInTheDocument();
    });

    it("should reset to copy icon after 2 seconds", async () => {
      render(<CopyButton value="test value" />);
      const button = screen.getByRole("button");

      await act(async () => {
        fireEvent.click(button);
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith("test value");

      // Should show check icon immediately after copy
      expect(screen.getByTestId("check-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("copy-icon")).not.toBeInTheDocument();

      // Fast-forward time by 2 seconds
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Should reset to copy icon after 2 seconds
      expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
    });
  });

  describe("Props and styling", () => {
    it("should apply custom className", () => {
      render(<CopyButton value="test value" className="custom-class" />);
      const container = screen.getByRole("button").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("should accept custom size and variant", () => {
      render(<CopyButton value="test value" size="lg" variant="outline" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      render(<CopyButton value="test value" label="timestamp" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Copy timestamp");
      expect(button).toHaveAttribute("title", "Copy timestamp");
    });

    it("should hide icons from screen readers", () => {
      render(<CopyButton value="test value" />);
      const button = screen.getByRole("button");
      const icon = button.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });
});
