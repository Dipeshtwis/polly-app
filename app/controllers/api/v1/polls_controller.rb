module Api
    module V1
      class PollsController < ApplicationController
        def index
          polls = Poll.all
          render status: :ok, json: { polls: polls }
        end
        def create
        end
      end
    end
  end