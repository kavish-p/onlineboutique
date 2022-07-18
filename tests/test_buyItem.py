import pytest
import allure
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options
from allure_commons.types import AttachmentType

class TestBuyItem():
  def setup_method(self, method):
    options = Options()
    options.headless = True
    options.add_argument('--no-sandbox')
    self.driver = webdriver.Chrome(options=options, executable_path="/opt/tools/chrome/chromedriver")
    self.vars = {}

  def teardown_method(self, method):
    self.driver.quit()

  @allure.suite("Online Boutique V1")
  @allure.title("Verify Buying Flow")
  @allure.description("Adding an item to cart, checking out and proceeding with payment.")
  def test_buyItem(self):
    self.driver.get("http://sample-app-frontend-gateway-525eca1d5089dbdc-istio-system.apps.okd.lab.mez9.local/")
    self.driver.set_window_size(1936, 1048)
    allure.attach(self.driver.get_screenshot_as_png(), name="01-Landing Page", attachment_type=AttachmentType.PNG)

    self.driver.find_element(By.CSS_SELECTOR, ".col-md-4:nth-child(2) .hot-product-card-img-overlay").click()
    allure.attach(self.driver.get_screenshot_as_png(), name="02-Product Page", attachment_type=AttachmentType.PNG)

    self.driver.find_element(By.CSS_SELECTOR, ".cymbal-button-primary").click()
    allure.attach(self.driver.get_screenshot_as_png(), name="03-Cart Page", attachment_type=AttachmentType.PNG)

    self.driver.find_element(By.CSS_SELECTOR, ".cymbal-button-primary:nth-child(1)").click()
    allure.attach(self.driver.get_screenshot_as_png(), name="04-Order Complete Page", attachment_type=AttachmentType.PNG)

    self.driver.find_element(By.LINK_TEXT, "Continue Shopping").click()
    allure.attach(self.driver.get_screenshot_as_png(), name="05-Landing Page", attachment_type=AttachmentType.PNG)

