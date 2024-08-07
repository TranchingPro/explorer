/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from "vue";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render } from "@testing-library/vue";

import { CALIBRATION_BETA_NETWORK, CALIBRATION_NETWORK } from "./../mocks";

import NetworkSwitch from "@/components/NetworkSwitch.vue";

import * as useEnvironmentConfig from "@/composables/useEnvironmentConfig";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({
    path: "",
  })),
}));

const location = {
  hostname: "https://staging-scan-v2.micro.dev/",
  search: "",
};

vi.mock("@/utils/helpers", () => ({
  getWindowLocation: () => location,
}));

describe("NetworkSwitch:", () => {
  beforeEach(() => {
    vi.spyOn(useEnvironmentConfig, "default").mockReturnValue({
      networks: computed(() => [CALIBRATION_NETWORK, CALIBRATION_BETA_NETWORK]),
    });
  });

  it("renders listbox button with selected option", async () => {
    const { container } = render(NetworkSwitch);
    expect(container.querySelector(".network-item-label")?.textContent).toBe("calibration");
  });

  it("renders list of networks when button is clicked", async () => {
    const { container } = render(NetworkSwitch);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await fireEvent.click(container.querySelector(".toggle-button")!);

    const options = container.querySelectorAll(".network-list-item-container > *");
    expect(options[0].getAttribute("href")).toBe("?network=calibration");
    expect(options[0].textContent).toBe("calibration");
    expect(options[0].tagName).toBe("LABEL");
    expect(options[0].querySelector("img")?.getAttribute("alt")).toBe("calibration logo");
    expect(options[1].getAttribute("href")).toBe("https://calibration-beta.staging-scan-v2.micro.dev/");
    expect(options[1].textContent).toBe("calibration Beta");
    expect(options[1].tagName).toBe("A");
    expect(options[1].querySelector("img")?.getAttribute("alt")).toBe("calibration Beta logo");
  });

  it("uses relative url schema for networks when on localhost", async () => {
    location.hostname = "localhost";

    const { container } = render(NetworkSwitch);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await fireEvent.click(container.querySelector(".toggle-button")!);

    const options = container.querySelectorAll(".network-list-item-container > *");
    expect(options[0].getAttribute("href")).toBe("?network=calibration");
    expect(options[0].textContent).toBe("calibration");
    expect(options[0].tagName).toBe("LABEL");
    expect(options[1].getAttribute("href")).toBe("?network=calibration-beta");
    expect(options[1].textContent).toBe("calibration Beta");
    expect(options[1].tagName).toBe("A");
  });

  it("uses relative url schema for networks when on preview deployment (.web.app)", async () => {
    location.hostname = "preview.web.app";
    const { container } = render(NetworkSwitch);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await fireEvent.click(container.querySelector(".toggle-button")!);

    const options = container.querySelectorAll(".network-list-item-container > *");
    expect(options[0].getAttribute("href")).toBe("?network=calibration");
    expect(options[0].textContent).toBe("calibration");
    expect(options[0].tagName).toBe("LABEL");
    expect(options[1].getAttribute("href")).toBe("?network=calibration-beta");
    expect(options[1].textContent).toBe("calibration Beta");
    expect(options[1].tagName).toBe("A");
  });
});
